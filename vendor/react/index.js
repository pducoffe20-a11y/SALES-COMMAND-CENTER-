let currentRoot = null;
let currentIndex = 0;
const state = [];

export function __setRoot(root) {
  currentRoot = root;
}

export function __resetHooks() {
  currentIndex = 0;
}

export function useState(initialValue) {
  const index = currentIndex;
  state[index] ??= typeof initialValue === 'function' ? initialValue() : initialValue;
  function setValue(nextValue) {
    state[index] = typeof nextValue === 'function' ? nextValue(state[index]) : nextValue;
    currentRoot?.render();
  }
  currentIndex += 1;
  return [state[index], setValue];
}

export function StrictMode({ children }) {
  return children;
}
