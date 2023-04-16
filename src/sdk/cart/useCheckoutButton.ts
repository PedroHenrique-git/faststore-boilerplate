import { config } from '@config/store';
import { useCart } from '.';

export function useCheckoutButton() {
  const {
    isValidating,
    isMutating,
    cart: { id },
  } = useCart();

  const checkoutUrl = config.base.useLocalCheckout
    ? '/checkout'
    : config.base.externalUrls.checkoutUrl;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidating && id) {
      window.location.href = `${checkoutUrl}?orderFormId=${id}`;
    }
  };

  return {
    onClick,
    isLoading: isValidating || isMutating,
  };
}
