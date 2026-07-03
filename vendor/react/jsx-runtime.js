function appendChild(parent, child) {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) {
    child.forEach((item) => appendChild(parent, item));
    return;
  }
  parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
}

function setProp(element, key, value) {
  if (key === 'children' || value === null || value === undefined || value === false) return;
  if (key === 'className') {
    element.setAttribute('class', value);
    return;
  }
  if (key === 'htmlFor') {
    element.setAttribute('for', value);
    return;
  }
  if (key.startsWith('on') && typeof value === 'function') {
    element.addEventListener(key.slice(2).toLowerCase(), value);
    return;
  }
  if (key === 'value') {
    element.value = value;
    return;
  }
  if (value === true) {
    element.setAttribute(key, '');
    return;
  }
  element.setAttribute(key, String(value));
}

export function jsx(type, props = {}) {
  if (typeof type === 'function') return type(props);
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => setProp(element, key, value));
  appendChild(element, props.children);
  return element;
}

export const jsxs = jsx;
export const Fragment = ({ children }) => children;
