interface DataLayerEvent extends Record<string, unknown> {
  event: string;
}

interface Window extends Window {
  dataLayer: DataLayerEvent[];
  sendrc: (_eventName: string, _eventValues?: unknown) => void;
}
