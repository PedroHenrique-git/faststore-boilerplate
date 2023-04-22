import { getPostalCodeRegex } from 'src/sdk/helpers/getCurrentPostalCodeRegex';
import * as yup from 'yup';

export const FormSchema = yup.object({
  postalCode: yup
    .string()
    .matches(getPostalCodeRegex().pattern, 'Invalid postal code')
    .required('Invalid postal code'),
});
