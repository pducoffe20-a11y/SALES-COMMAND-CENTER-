import { __resetHooks, __setRoot } from 'react';

export function createRoot(container) {
  const root = {
    component: null,
    render(component) {
      if (component !== undefined) root.component = component;
      container.replaceChildren();
      __resetHooks();
      const next = typeof root.component === 'function' ? root.component() : root.component;
      if (Array.isArray(next)) container.append(...next);
      else if (next) container.append(next);
    },
  };
  __setRoot(root);
  return root;
}
