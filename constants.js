// number values indicate milliseconds
export const QUOTES_IN_DURATION = 2500;
export const QUOTES_IN_DELAY = 1000;
export const QUOTES_OUT_DURATION = 3000;
export const SVG_LOAD_DURATION = 3000;
export const SVG_OUT_DURATION = 3500;
export const SVG_IN_DURATION = 3000;
export const SVG_IN_DELAY = 500;

export const TRANSITION_TIME_ON_INIT = Math.max(SVG_OUT_DURATION, (QUOTES_IN_DURATION + QUOTES_IN_DELAY));
export const TRANSITION_TIME = Math.max(QUOTES_OUT_DURATION, (SVG_IN_DELAY + SVG_IN_DURATION)) + Math.max(SVG_OUT_DURATION, (QUOTES_IN_DELAY + QUOTES_IN_DURATION));
