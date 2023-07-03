import * as yup from 'yup';

export const FormSchema = yup.object({
  city: yup.string().required('City is required'),
  complement: yup.string(),
  neighborhood: yup.string().required('Neighborhood is required'),
  postalCode: yup.string().required('Postal code is required'),
  state: yup.string().required('State is required'),
  street: yup.string().required('Street is required'),
  number: yup
    .number()
    .typeError('Number must be a number')
    .required('Number is required'),
});
