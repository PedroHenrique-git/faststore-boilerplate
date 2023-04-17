import { useMemo } from 'react';

interface Params {
  listPrice: number;
  spotPrice: number;
}

export function useDiscountPercent({ listPrice, spotPrice }: Params) {
  return useMemo(() => {
    return Math.ceil(((listPrice - spotPrice) * 100) / listPrice);
  }, [listPrice, spotPrice]);
}
