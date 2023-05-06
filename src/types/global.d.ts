interface Window extends Window {
  dataLayer: unknown[];
  sendrc: (_eventName: string, _eventValues?: unknown) => void;
}
