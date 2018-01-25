let listeners: Listener[] = [];

export type Listener = (status: boolean) => void;

export function addListener(listener: Listener) {
  listeners.push(listener);
}

export function removeListener(listener: Listener) {
  listeners = listeners.filter(v => v != listener);
}

export function emitDevtoolsStatusChange(status: boolean) {
  for (const listener of listeners) {
    try {
      listener(status);
    } catch {
      /** nothing to do */
    }
  }
}
