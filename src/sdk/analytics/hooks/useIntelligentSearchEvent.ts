import { sendAnalyticsEvent } from '@faststore/sdk';
import { useCallback } from 'react';
import { IntelligentSearchQueryEvent } from '../types';

interface Params {
  locale: string;
  term: string;
  url: string;
  logicalOperator: string;
  isTermMisspelled: boolean;
  totalCount: number;
}

export function useIntelligentSearchEvent() {
  const sendIntelligentSearchEvent = useCallback(
    ({
      isTermMisspelled,
      locale,
      logicalOperator,
      term,
      totalCount,
      url,
    }: Params) => {
      sendAnalyticsEvent<IntelligentSearchQueryEvent>({
        name: 'intelligent_search_query',
        params: {
          locale,
          term,
          url,
          logicalOperator: logicalOperator ?? 'and',
          isTermMisspelled: isTermMisspelled ?? false,
          totalCount: totalCount,
        },
      });
    },
    [],
  );

  return { sendIntelligentSearchEvent };
}
