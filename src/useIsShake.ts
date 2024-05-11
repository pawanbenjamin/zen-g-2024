import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';

type Poll = number | null;
type IsShakeProps = { x: number };

export function useIsShake() {
  const [_, setData] = useState<IsShakeProps>();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isShakeTriggered, setIsShakeTriggered] = useState(false);
  const [isShakeReady, setIsShakeReady] = useState(false);

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

  useEffect(() => {
    // invocation of _subscribe when isToggleReady === true
    if (isShakeReady) {
      _subscribe();
      // isShake Accelerometer listener is removed when !isToggleReady
    } else _unsubscribe();
    return () => _unsubscribe();
  }, [isShakeReady]);

  return { isShakeTriggered, setIsShakeReady };
};
