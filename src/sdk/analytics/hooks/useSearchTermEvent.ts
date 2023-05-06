import { SearchEvent, sendAnalyticsEvent } from '@faststore/sdk';
import { useCallback } from 'react';

export function useSearchTermEvent() {
  const sendSearchTermEvent = useCallback((term: string) => {
    sendAnalyticsEvent<SearchEvent>({
      name: 'search',
      params: { search_term: term },
    });
  }, []);

  return { sendSearchTermEvent };
}
