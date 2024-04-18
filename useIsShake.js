import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, TRANSITION_TIME_2 } from './constants';

export function useIsShake() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [toggle, setToggle] = useState(false);
  // const [readyToggle, setReadyToggle] = useState(false);

  let polls = [null, null];
  let diffs = [];
  let shakeCount = 0;
  let readyToggleState;
  let toggledBefore;

  function isShake({ x: newX, y: newY, z: newZ }) {
    if (diffs.length === 2) {
      shakeCount++;

      if (readyToggleState === true) {
        console.log("useIsShake readyToggleState === true if block");
        setToggle(true);
        // setReadyToggle(() => {
        //   readyToggleState = false;
        //   return false;
        // });
        readyToggleState = false;

        if (toggledBefore === undefined) toggledBefore = false;
        else if (toggledBefore === false) toggledBefore = true;

        let throttleTime;
        if (toggledBefore === false) {
          throttleTime = Math.max(SVG_OUT_DURATION, (QUOTES_IN_DURATION + QUOTES_IN_DELAY));
        } else {
          throttleTime = TRANSITION_TIME_2;
        }

        setTimeout(() => {
          setToggle(false);
          // setReadyToggle((oldReadyToggle) => {
          //   return true;
          // });
          // console.log("useIsShake - toggle: false, readyToggle: true");
          readyToggleState = true;
          console.log("useIsShake, setTimeout - toggle: false, readyToggleState: true");
        }, throttleTime);
      }

      console.log({ shakeCount, diffs, toggledBefore });

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

    setTimeout(() => {
      // setReadyToggle(true);
      // console.log("readyToggle set to:", readyToggleState);
      readyToggleState = true;
      console.log("readyToggleState set to:", readyToggleState);
    }, SVG_LOAD_DURATION);

    return () => _unsubscribe();
  }, []);

  return { toggle };
};
