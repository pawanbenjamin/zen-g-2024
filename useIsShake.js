import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { SVG_LOAD_DURATION, TRANSITION_TIME_ON_INIT, TRANSITION_TIME } from './constants';

export function useIsShake() {
  const [{ x }, setData] = useState({
    x: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [isShakeTriggered, setIsShakeTriggered] = useState(false);

  let polls = [null, null];
  let diffs = [];
  let shakeCount = 0;
  let isToggleReady;
  let hasToggledBefore;

  function isShake({ x: newX }) {
    if (isToggleReady === true) {
      if (diffs.length === 2) {
        shakeCount++;
        setIsShakeTriggered(true);
        isToggleReady = false;

        if (hasToggledBefore === undefined) hasToggledBefore = false;
        else if (hasToggledBefore === false) hasToggledBefore = true;

        let debounceTime;
        if (hasToggledBefore === false) {
          debounceTime = TRANSITION_TIME_ON_INIT;
        } else {
          debounceTime = TRANSITION_TIME;
        }

        const toReady = setTimeout(() => {
          // setToggle(false);
          isToggleReady = true;
          console.log("useIsShake, setTimeout - toggle: false, isToggleReady: true");
          clearTimeout(toReady);
        }, debounceTime);

        polls = [null, null];
        diffs = [];
        //setToggle experiment
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
    _subscribe();

    const onLoad = setTimeout(() => {
      isToggleReady = true;
      console.log("isToggleReady set to:", isToggleReady);
      clearTimeout(onLoad);
    }, SVG_LOAD_DURATION);

    return () => _unsubscribe();
  }, []);

  return { isShakeTriggered };
};
