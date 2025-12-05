const listeners: any= {};

export const eventBus = {
  on(event: string, cb: () => void) {
    listeners[event] = listeners[event] || [];
    listeners[event].push(cb);
  },
  emit(event: string, data?: any) {
    (listeners[event] || []).forEach((cb: any) => cb(data));
  },
};
