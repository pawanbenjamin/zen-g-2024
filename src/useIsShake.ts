import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Subscription, isAvailableAsync, requestPermissionsAsync } from 'expo-sensors/build/Pedometer';
import { openSettings } from 'expo-linking';

type Poll = number | null;
type IsShakeProps = { x: number };
type IsAccelerometerAvailable = 'unckecked' | boolean;

export function useIsShake() {
  const [_, setData] = useState<IsShakeProps>();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isShakeTriggered, setIsShakeTriggered] = useState(false);
  const [isShakeReady, setIsShakeReady] = useState(false);
  const [isAccelerometerAvailable, setIsAccelerometerAvailable] = useState<IsAccelerometerAvailable>('unckecked');
  const [isAccelerometerAvailPending, setIsAccelerometerAvailPending] = useState(false);

  let polls: Poll[] = [null, null];
  let diffs = [];

  function isShake({ x: newX }: IsShakeProps) {
    if (diffs.length === 2) {
      setIsShakeTriggered(true);
      setIsShakeReady(false);

      polls = [null, null];
      diffs = [];

      setIsShakeTriggered(false);
    }

    if (newX < 0) polls[0] = newX;
    if (newX >= 0) polls[1] = newX;

    let change;
    if (polls[0] && (polls[1] || polls[1] === 0)) {
      change = Math.abs(polls[1] - polls[0]);
    }
    if (change && change > 1.5) {
      diffs.push(change);
      polls = [null, null];
    }

    setData({ x: newX });
  };

  Accelerometer.setUpdateInterval(75);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(isShake));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const checkAccelerometerAvailablity = async () => {
    const availability = await isAvailableAsync();
    setIsAccelerometerAvailable(() => {
      setIsAccelerometerAvailPending(false);
      return availability;
    });
  };

  const getAccelerometerPermission = async () => {
    const permissionResponse = await requestPermissionsAsync();
    if (permissionResponse.granted) {
      setIsAccelerometerAvailable(() => {
        setIsAccelerometerAvailPending(false);
        return permissionResponse.granted;
      });
      // following else if block for when permissionResponse.canAskAgain === false in order to direct end user to Settings app in order to enable permission to access Accelerometer
    } else if (!permissionResponse.canAskAgain) openSettings();
  };

  useEffect(() => {
    if (isAccelerometerAvailable === 'unckecked' && !isAccelerometerAvailPending) {
      setIsAccelerometerAvailPending(true);
      checkAccelerometerAvailablity();
    };
    if (!isAccelerometerAvailable && !isAccelerometerAvailPending) {
      setIsAccelerometerAvailPending(true);
      getAccelerometerPermission();
    };
    // invocation of _subscribe when accelerometer is available and isShakeReady === true
    if (isAccelerometerAvailable && isShakeReady) {
      _subscribe();
      // isShake Accelerometer listener is removed when !isShakeReady
    } else if (isAccelerometerAvailable && !isShakeReady) _unsubscribe();
    return () => _unsubscribe();
  }, [isShakeReady, isAccelerometerAvailable]);

  return { isShakeTriggered, setIsShakeReady };
};
