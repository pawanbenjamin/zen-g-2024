import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export function useIsShake() {
  const [{ x }, setData] = useState({
    x: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [isShakeTriggered, setIsShakeTriggered] = useState(false);
  const [isToggleReady, setIsToggleReady] = useState(false);

  let polls = [null, null];
  let diffs = [];

  function isShake({ x: newX }) {
    // console.log(newX);

    if (diffs.length === 2) {
      setIsShakeTriggered(true);
      setIsToggleReady(false);

      console.log("isShakeTriggered", { diffs });

      polls = [null, null];
      diffs = [];

      setIsShakeTriggered(false);
    }

    if (newX < 0) polls[0] = newX;
    if (newX >= 0) polls[1] = newX;
    let change;

    if (polls[0] !== null && polls[1] !== null) {
      change = Math.abs(polls[1] - polls[0]);
    }
    if (change > 1.5) {
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
    if (isToggleReady) {
      _subscribe();
      // isShake Accelerometer listener is removed when !isToggleReady
    } else _unsubscribe();
    return () => _unsubscribe();
  }, [isToggleReady]);

  return { isShakeTriggered, setIsToggleReady };
};
