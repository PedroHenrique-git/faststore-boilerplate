import { useCallback } from 'react';
import { useSession } from '../session';

export interface Params {
  price: number;
  decimals?: boolean;
}

export function useFormatPrice(oldPrice?: number) {
  const {
    session: { locale, currency },
  } = useSession();

  const formatter = useCallback(
    ({ price, decimals }: Params) => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: decimals ? 2 : 0,
      }).format(price);
    },
    [locale, currency],
  );

  return {
    ...(oldPrice ? { newPrice: formatter({ price: oldPrice }) } : {}),
    formatter,
  };
}
