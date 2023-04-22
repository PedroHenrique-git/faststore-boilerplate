import { config } from '@config/store';
import { POSTAL_CODE_REGEX } from '../constants';

export function getPostalCodeRegex() {
  return POSTAL_CODE_REGEX[config.base.session.locale];
}
