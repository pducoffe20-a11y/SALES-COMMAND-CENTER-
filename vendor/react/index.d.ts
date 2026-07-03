export type FormEvent = Event & { preventDefault(): void };
export function useState<T>(initialValue: T | (() => T)): [T, (nextValue: T | ((current: T) => T)) => void];
export function StrictMode(props: { children?: JSX.Element | JSX.Element[] }): JSX.Element | JSX.Element[] | undefined;

declare global {
  namespace JSX {
    type Element = Node | string | number | boolean | null | undefined | Element[];
    interface ChangeEvent<T = HTMLInputElement> extends Event { target: T; }
    interface IntrinsicAttributes { key?: string | number; }
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}
