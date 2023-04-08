import { useCallback } from 'react';

// TODO: get values from session

export interface Params {
  price: number;
  decimals?: boolean;
}

export function useFormatPrice(oldPrice?: number) {
  const formatter = useCallback(({ price, decimals }: Params) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: decimals ? 2 : 0,
    }).format(price);
  }, []);

  return {
    ...(oldPrice ? { newPrice: formatter({ price: oldPrice }) } : {}),
    formatter,
  };
}
