import { ShippingData } from '@services/orders/types';

export default function getCompleteAddress(shippingData: ShippingData) {
  return `${shippingData?.selectedAddresses?.at(0)?.street} ${
    shippingData?.selectedAddresses.at(0)?.number
  }, ${shippingData?.selectedAddresses.at(0)?.neighborhood}, ${
    shippingData?.selectedAddresses.at(0)?.city
  } - ${shippingData?.selectedAddresses.at(0)?.state}, ${
    shippingData?.selectedAddresses.at(0)?.postalCode
  }, ${shippingData?.selectedAddresses.at(0)?.country}`;
}
