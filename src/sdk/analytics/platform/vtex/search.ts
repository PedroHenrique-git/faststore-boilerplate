import type { AnalyticsEvent } from '@faststore/sdk';

import { config } from '@config/store';
import type {
  IntelligentSearchQueryEvent,
  SearchSelectItemEvent,
} from '../../types';

const THIRTY_MINUTES_S = 30 * 60;
const ONE_YEAR_S = 365 * 24 * 3600;

const randomUUID = () =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : (Math.random() * 1e6).toFixed(0);

const createStorage = (key: string, expiresSecond: number) => {
  const timelapsed = (past: number) => (Date.now() - past) / 1e3;

  return () => {
    const item = JSON.parse(localStorage.getItem(key) ?? 'null');
    const isExpired = !item || timelapsed(item.createdAt) > expiresSecond;
    const payload: string = isExpired ? randomUUID() : item.payload;

    if (isExpired) {
      const data = { payload, createdAt: Date.now() };

      localStorage.setItem(key, JSON.stringify(data));
    }

    return payload;
  };
};

const user = {
  anonymous: createStorage('vtex.search.anonymous', ONE_YEAR_S),
  session: createStorage('vtex.search.session', THIRTY_MINUTES_S),
};

type SearchEvent =
  | {
      type: 'session.ping';
    }
  | {
      position: number;
      productId: string;
      text: string;
      url: string;
      type: 'search.click';
    }
  | {
      type: 'search.query';
      text: string;
      misspelled: boolean;
      match: number;
      operator: string;
      locale: string;
      url: string;
    };

const sendEvent = (options: SearchEvent & { url?: string }) =>
  fetch(`https://sp.vtex.com/event-api/v1/${config.base.api.storeId}/event`, {
    method: 'POST',
    body: JSON.stringify({
      ...options,
      userAgent: navigator.userAgent,
      anonymous: user.anonymous(),
      session: user.session(),
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

const isFullTextSearch = (url: URL) =>
  typeof url.searchParams.get('q') === 'string' &&
  /^\/s(\/)?$/g.test(url.pathname);

const handleEvent = (
  event: AnalyticsEvent | SearchSelectItemEvent | IntelligentSearchQueryEvent,
) => {
  switch (event.name) {
    case 'search_select_item': {
      const url = new URL(event.params.url);

      if (!isFullTextSearch(url)) {
        return;
      }

      for (const item of event.params.items ?? []) {
        const productId = item.item_id ?? item.item_variant;
        const position = item.index;

        if (productId && position) {
          sendEvent({
            type: 'search.click',
            productId,
            position,
            url: url.href,
            text: url.searchParams.get('q') ?? '<empty>',
          });
        }
      }

      break;
    }

    case 'intelligent_search_query': {
      sendEvent({
        type: 'search.query',
        url: event.params.url,
        text: event.params.term,
        misspelled: event.params.isTermMisspelled,
        match: event.params.totalCount,
        operator: event.params.logicalOperator,
        locale: event.params.locale,
      });

      break;
    }

    default:
  }
};

setInterval(
  () => sendEvent({ type: 'session.ping' }),
  60 * 1e3 /* One minute */,
);

export default handleEvent;
