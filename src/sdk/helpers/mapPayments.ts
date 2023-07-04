import { PaymentData } from '@services/orders/types';

export default function mapPayments(paymentData: PaymentData) {
  return paymentData.transactions.flatMap((t) =>
    t.payments.map((p) => ({
      name: p.paymentSystemName,
      installments: p.installments,
      value: p.value,
    })),
  );
}
