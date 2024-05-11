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
    // i very much dislike this below... bad... make it stop...
    let change;
    if (polls && polls[0] !== null && polls[1] !== null) {
      const poll1 = polls[0];
      const poll2 = polls[1];
      if (poll1 && poll2) {
        change = Math.abs(poll2 - poll1);
      }
    }
    if (change !== undefined && change > 1.5) {
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
