import { ClientProfileData } from '@services/orders/types';

export default function getCompleteName(clientProfileData: ClientProfileData) {
  return `${clientProfileData.firstName} ${clientProfileData.lastName}`;
}
