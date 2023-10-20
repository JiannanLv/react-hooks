"use strict";
export default (...reducers) => {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
};
