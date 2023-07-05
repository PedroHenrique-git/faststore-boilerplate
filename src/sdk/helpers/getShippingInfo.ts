import { ShippingData } from '@services/orders/types';

export default function getShippingInfo(shippingData: ShippingData) {
  const shippingInfo = shippingData.logisticsInfo.at(0);
  const [days] = shippingInfo?.shippingEstimate.match(/\d/) ?? [];

  return {
    name: shippingInfo?.deliveryCompany,
    days,
  };
}
