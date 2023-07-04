export interface OrdersList {
  list: Order[];
  facers: string[];
  paging: Page[];
  stats: Stat;
}

export interface Stat {
  stats: {
    totalValue: {
      Count: number;
      Max: number;
      Mean: number;
      Min: number;
      Missing: number;
      StdDev: number;
      Sum: number;
      SumOfSquares: number;
      Facets: unknown;
    };
    totalItems: {
      Count: number;
      Max: number;
      Mean: number;
      Min: number;
      Missing: number;
      StdDev: number;
      Sum: number;
      SumOfSquares: number;
      Facets: unknown;
    };
  };
}

export interface Page {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
}

export interface Order {
  orderId: string;
  creationDate: string;
  clientName: string;
  items: Item[];
  totalValue: number;
  paymentNames: string | null;
  status: OrderStatus;
  statusDescription: string;
  marketPlaceOrderId: string;
  sequence: string;
  salesChannel: string;
  affiliateId: string;
  origin: string;
  workflowInErrorState: boolean;
  workflowInRetry: boolean;
  lastMessageUnread: string | null;
  ShippingEstimatedDate: string | null;
  ShippingEstimatedDateMax: string | null;
  ShippingEstimatedDateMin: string | null;
  orderIsComplete: boolean;
  listId: string | null;
  listType: string | null;
  authorizedDate: string | null;
  callCenterOperatorName: string | null;
  totalItems: number;
  currencyCode: string | null;
}

export interface OrderDetail {
  orderId: string;
  sequence: string;
  marketplaceOrderId: string;
  marketplaceServicesEndpoint: string;
  sellerOrderId: string;
  origin: string;
  affiliateId: string;
  salesChannel: string;
  merchantName: string;
  status: OrderStatus;
  statusDescription: string;
  value: number;
  creationDate: string;
  lastChange: string;
  orderGroup: string;
  totals: Total[];
  items: OrderDetailsItem[];
  marketplaceItems: string[];
  clientProfileData: ClientProfileData;
  giftRegistryData: string | null;
  marketingData: MarketingData;
  ratesAndBenefitsData: RatesAndBenefitsData;
  shippingData: ShippingData;
  paymentData: PaymentData;
  packageAttachment: {
    packages: string[];
  };
  sellers: Seller[];
  callCenterOperatorData: string | null;
  followUpEmail: string | null;
  lastMessage: string | null;
  hostname: string;
  invoiceData: unknown | null;
  changesAttachment: ChangesAttachment;
  openTextField: string | null;
  roundingError: number;
  orderFormId: string;
  commercialConditionData: string | null;
  isCompleted: boolean;
  customData: string | null;
  storePreferencesData: StorePreferencesData;
  allowCancellation: boolean;
  allowEdition: boolean;
  isCheckedIn: boolean;
  marketplace: Marketplace;
  authorizedDate: string;
  invoicedDate: string | null;
  cancelReason: string | null;
  checkedInPickupPointId: string;
  // TODO: add missing fields: itemMetadata, subscriptionData, taxData, cancellationData, clientPreferencesData
}

export interface Marketplace {
  baseURL: string;
  isCertified: string | null;
  name: string;
}

export interface StorePreferencesData {
  countryCode: string;
  currencyCode: string;
  currencyFormatInfo: {
    CurrencyDecimalDigits: number;
    CurrencyDecimalSeparator: string;
    CurrencyGroupSeparator: string;
    CurrencyGroupSize: number;
    StartsWithCurrencySymbol: boolean;
  };
  currencyLocale: number;
  currencySymbol: string;
  timeZone: string;
}

export interface ChangesAttachment {
  id: string;
  changesData: ChangesData[];
}

export interface ChangesData {
  reason: string;
  discountValue: number;
  incrementValue: number;
  itemsAdded: string[];
  itemsRemoved: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    unitMultiplier: string | null;
  }>;
  receipt: {
    date: string;
    orderId: string;
    receipt: string;
  };
}

export interface Seller {
  id: string;
  name: string;
  logo: string;
  fulfillmentEndpoint: string;
}

export interface PaymentData {
  giftCards: unknown[];
  transactions: Transaction[];
}

export interface Transaction {
  isActive: boolean;
  transactionId: string;
  merchantName: string;
  payments: Payment[];
}

export interface Payment {
  id: string;
  paymentSystem: string;
  paymentSystemName: string;
  value: number;
  installments: number;
  referenceValue: number;
  cardHolder: string | null;
  cardNumber: string | null;
  firstDigits: string | null;
  lastDigits: string | null;
  cvv2: string | null;
  expireMonth: string | null;
  expireYear: string | null;
  url: string;
  giftCardId: string | null;
  giftCardName: string | null;
  giftCardCaption: string | null;
  redemptionCode: string | null;
  group: string;
  tid: string | null;
  dueDate: string;
  connectorResponses: ConnectorResponses;
  giftCardProvider: string;
  giftCardAsDiscount: boolean;
  koinUrl: string;
  accountId: string;
  parentAccountId: string;
  bankIssuedInvoiceIdentificationNumber: string;
  bankIssuedInvoiceIdentificationNumberFormatted: string;
  bankIssuedInvoiceBarCodeNumber: string;
  bankIssuedInvoiceBarCodeType: string;
  billingAddress: unknown;
}

export interface ConnectorResponses {
  Tid: string;
  ReturnCode: string;
  Message: string;
  authId: string;
}

export interface RatesAndBenefitsData {
  id: string;
  rateAndBenefitsIdentifiers: string[];
}

export interface ShippingData {
  id: string;
  address: Address;
  logisticsInfo: LogisticsInfo[];
  trackingHints: string | null;
  selectedAddresses: Address[];
}

export interface LogisticsInfo {
  itemIndex: number;
  selectedSla: string;
  lockTTL: string;
  price: number;
  listPrice: number;
  sellingPrice: number;
  deliveryWindow: string | null;
  deliveryCompany: string;
  shippingEstimate: string;
  shippingEstimateDate: string;
  slas: Sla[];
  shipsTo: string[];
  deliveryIds: DeliveryIds[];
  deliveryChannels: DeliveryChannels[];
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo;
  addressId: string;
  versionId: string | null;
  entityId: string;
  polygonName: string | null;
  pickupPointId: string;
  transitTime: string;
}

export interface PickupStoreInfo {
  additionalInfo: string | null;
  address: string | null;
  dockId: string | null;
  friendlyName: string | null;
  isPickupStore: boolean;
}

export interface DeliveryChannels {
  id: string;
  stockBalance: number;
}

export interface DeliveryIds {
  courierId: string;
  courierName: string;
  dockId: string;
  quantity: number;
  warehouseId: string;
  accountCarrierName: string;
  kitItemDetails: unknown[];
}

export interface Sla {
  id: string;
  name: string;
  shippingEstimate: string;
  deliveryWindow: string | null;
  price: number;
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo;
  polygonName: string | null;
  lockTTL: string;
  pickupPointId: string;
  transitTime: string;
  pickupDistance: number;
}

export interface PickupStoreInfo {
  additionalInfo: string | null;
  address: string | null;
  dockId: string | null;
  friendlyName: string | null;
  isPickupStore: boolean;
}

export interface Address {
  addressType: string;
  receiverName: string;
  addressId: string;
  versionId: string | null;
  entityId: string | null;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string | null;
  geoCoordinates: string[];
}

export interface MarketingData {
  id: string;
  utmSource: string;
  utmPartner: string;
  utmMedium: string;
  utmCampaign: string;
  coupon: string;
  utmiCampaign: string;
  utmipage: string;
  utmiPart: string;
  marketingTags: string[];
}

export interface ClientProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  document: string;
  phone: string;
  corporateName: string | null;
  tradeName: string | null;
  corporateDocument: string | null;
  stateInscription: string | null;
  corporatePhone: string | null;
  isCorporate: boolean;
  userProfileId: string;
  customerClass: string | null;
}

export interface OrderDetailsItem {
  uniqueId: string;
  id: string;
  productId: string;
  ean: string | null;
  lockId: string;
  itemAttachment: Attachment;
  attachments: string[];
  quantity: number;
  seller: string;
  name: string;
  refId: string;
  price: number;
  listPrice: number;
  manualPrice: string | null;
  priceTags: string[];
  imageUrl: string;
  detailUrl: string;
  components: string[];
  bundleItems: string[];
  params: string[];
  offerings: string[];
  attachmentOfferings: AttachmentOfferings[];
  sellerSku: string;
  priceValidUntil: string | null;
  commission: number;
  tax: number;
  preSaleDate: string | null;
  additionalInfo: AdditionalInfo;
  measurementUnit: string;
  unitMultiplier: number;
  sellingPrice: number;
  isGift: boolean;
  shippingPrice: string | null;
  rewardValue: number;
  freightCommission: number;
  priceDefinitions: PriceDefinitions;
  taxCode: string | null;
  parentItemIndex: string | null;
  parentAssemblyBinding: string | null;
  callCenterOperator: string | null;
  serialNumbers: string | null;
  assemblies: unknown[];
  costPrice: number;
}

export interface PriceDefinitions {
  sellingPrices: Array<{
    value: number;
    quantity: number;
  }>;
  calculatedSellingPrice: number;
  total: number;
}

export interface AdditionalInfo {
  brandName: string;
  brandId: string;
  categoriesIds: string;
  productClusterId: string;
  commercialConditionId: string;
  dimension: Dimension;
  offeringInfo: string | null;
  offeringType: string | null;
  offeringTypeId: string | null;
}

export interface Dimension {
  cubicweight: number;
  height: number;
  length: number;
  weight: number;
  width: number;
}

export interface AttachmentOfferings {
  name: string | null;
  required: boolean | null;
  schema: unknown | null;
}

export interface Attachment {
  content: unknown;
  name: string | null;
}

export interface Total {
  id: string;
  name: string;
  value: number;
}

export interface Item {
  seller: string;
  quantity: number;
  description: string;
  ean: string | null;
  refId: string | null;
  id: string;
  productId: string;
  sellingPrice: number;
  price: number;
}

export type OrderStatus =
  | 'order-created'
  | 'order-accepted'
  | 'cancel'
  | 'on-order-completed'
  | 'on-order-completed-ffm'
  | 'payment-approved'
  | 'payment-pending'
  | 'request-cancel'
  | 'canceled'
  | 'window-to-change-payment'
  | 'window-to-change-seller'
  | 'waiting-for-authorization'
  | 'waiting-for-fulfillment'
  | 'waiting-ffmt-authorization'
  | 'waiting-for-manual-authorization'
  | 'authorize-fulfillment'
  | 'window-to-cancel'
  | 'ready-for-invoicing'
  | 'invoice'
  | 'invoiced'
  | 'ready-for-handling'
  | 'start-handling'
  | 'cancellation-requested'
  | 'waiting-for-mkt-authorization'
  | 'waiting-seller-handling'
  | 'handling';
