import { config } from '@config/store';
import type { AnalyticsEvent } from '@faststore/sdk';
import { useAnalyticsEvent } from '@faststore/sdk';

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? [];
}

export const AnalyticsHandler = () => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({ event: event.name, ecommerce: event.params });

    import(`./platform/${config.base.platform}`).then(
      ({ default: sendEvent }) => {
        sendEvent(event);
      },
    );
  });

  return null;
};

export default AnalyticsHandler;
