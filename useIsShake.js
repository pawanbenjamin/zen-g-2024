import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export function useIsShake() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [toggle, setToggle] = useState(false);

  let polls = [null, null];
  let diffs = [];
  let shakeCount = 0;

  function isShake({ x: newX, y: newY, z: newZ }) {
    if (diffs.length === 2) {
      shakeCount++;
      let newState;
      setToggle((oldState) => {
        console.log("oldState:", oldState);
        newState = !oldState
        return !oldState;
      });
      console.log({ shakeCount, diffs, newState });
      polls = [null, null];
      diffs = [];
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

    setData({ x: newX, y: newY, z: newZ });
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
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return { toggle };
};
