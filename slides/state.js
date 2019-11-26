const stateWrapper = {
  state: {
    draw: false
  }
};

export function getState() {
  return Object.freeze(stateWrapper.state);
}

export function update(newState = {}) {
  stateWrapper.state = {
    ...stateWrapper.state,
    ...newState
  };
}
