import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY } from './constants';

export function useIsShake() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [readyToggle, setReadyToggle] = useState(false);

  let polls = [null, null];
  let diffs = [];
  let shakeCount = 0;

  function isShake({ x: newX, y: newY, z: newZ }) {
    if (diffs.length === 2) {
      // console.log("isShake if block");
      shakeCount++;
      let initialReadyToggleState;
      let newToggleState;

      setReadyToggle((oldReadyToggleState) => {
        initialReadyToggleState = oldReadyToggleState;
        if (oldReadyToggleState === true) {
          return false;
        } else return oldReadyToggleState;
      });

      if (initialReadyToggleState === true) {
        setToggle((oldToggleState) => {
          // console.log("oldToggleState:", oldToggleState);
          newToggleState = !oldToggleState
          return !oldToggleState;
        });
        let throttleTime;
        if (newToggleState === true) {
          // console.log("toggle === true");
          throttleTime = Math.max(SVG_OUT_DURATION, (QUOTES_IN_DURATION + QUOTES_IN_DELAY));
        } else {
          // console.log("toggle === false");
          throttleTime = Math.max(QUOTES_OUT_DURATION, (SVG_IN_DURATION + SVG_IN_DELAY));
        }
        setTimeout(() => {
          // console.log("setTimeout after shake toggle");
          setReadyToggle((oldReadyToggleState) => {
            // console.log("old readyToggle:", oldReadyToggleState);
            return true;
          });
        }, throttleTime);
      }

      console.log({ shakeCount, diffs, initialReadyToggleState, newToggleState });

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
      // console.log("setTimeout on load");
      setReadyToggle((oldState) => {
        // console.log("old readyToggle:", oldState);
        return true;
      });
    }, SVG_LOAD_DURATION);

    return () => _unsubscribe();
  }, []);

  return { toggle };
};
