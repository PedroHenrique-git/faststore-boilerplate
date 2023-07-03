export interface User {
  id: string | null;
  userId: string | null;
  email: string | null;
  document: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  birthDate: string | null;
}

export interface Address {
  id: string | null;
  postalCode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  complement: string | null;
  reference: string | null;
  geoCoordinates: number[] | null;
  userId: string | null;
  addressName: string | null;
}
