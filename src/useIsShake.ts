import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Subscription, isAvailableAsync, requestPermissionsAsync } from 'expo-sensors/build/Pedometer';
import * as Linking from 'expo-linking';

type Poll = number | null;
type IsShakeProps = { x: number };

export function useIsShake() {
  const [_, setData] = useState<IsShakeProps>();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isShakeTriggered, setIsShakeTriggered] = useState(false);
  const [isShakeReady, setIsShakeReady] = useState(false);
  const [isAccelerometerAvail, setIsAccelerometerAvail] = useState<boolean | null>(null);
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

  const checkAccelerometerAvail = async () => {
    const availability = await isAvailableAsync();
    setIsAccelerometerAvail(() => {
      setIsAccelerometerAvailPending(false);
      return availability;
    });
  };

  const getAccelerometerPermiss = async () => {
    const permissionResponse = await requestPermissionsAsync();
    if (permissionResponse.granted) setIsAccelerometerAvail(() => {
      setIsAccelerometerAvailPending(false);
      return permissionResponse.granted;
    }); // following else if block for when permissionResponse.canAskAgain === false in order to direct end user to Settings app in order to enable permission to access Accelerometer
    else if (!permissionResponse.canAskAgain) {
      Linking.openSettings();
    };
  };

  useEffect(() => {
    if (isAccelerometerAvail === null && !isAccelerometerAvailPending) {
      setIsAccelerometerAvailPending(true);
      checkAccelerometerAvail();
    };
    if (isAccelerometerAvail === false && !isAccelerometerAvailPending) {
      setIsAccelerometerAvailPending(true);
      getAccelerometerPermiss();
    };
    // invocation of _subscribe when isToggleReady === true
    if (isAccelerometerAvail && isShakeReady) {
      _subscribe();
      // isShake Accelerometer listener is removed when !isToggleReady
    } else if (isAccelerometerAvail && !isShakeReady) _unsubscribe();
    return () => _unsubscribe();
  }, [isShakeReady, isAccelerometerAvail]);

  return { isShakeTriggered, setIsShakeReady };
};
