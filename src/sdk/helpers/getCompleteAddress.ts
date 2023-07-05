import { ShippingData } from '@services/orders/types';

export default function getCompleteAddress(shippingData: ShippingData) {
  let completeAddress = '';

  const street = shippingData?.selectedAddresses?.at(0)?.street;
  const number = shippingData?.selectedAddresses.at(0)?.number;
  const neighborhood = shippingData?.selectedAddresses.at(0)?.neighborhood;
  const city = shippingData?.selectedAddresses.at(0)?.city;
  const state = shippingData?.selectedAddresses.at(0)?.state;
  const postalCode = shippingData?.selectedAddresses.at(0)?.postalCode;
  const country = shippingData?.selectedAddresses.at(0)?.country;

  if (street) {
    completeAddress += `${street} `;
  }

  if (number) {
    completeAddress += `${number}, `;
  }

  if (neighborhood) {
    completeAddress += `${neighborhood}, `;
  }

  if (city) {
    completeAddress += `${city} - `;
  }

  if (state) {
    completeAddress += `${state}, `;
  }

  if (postalCode) {
    completeAddress += `${postalCode}, `;
  }

  if (country) {
    completeAddress += `${country}`;
  }

  return completeAddress;
}
