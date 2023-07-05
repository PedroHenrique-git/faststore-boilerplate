import * as yup from 'yup';

export const FormSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string(),
  birthDate: yup.string(),
  email: yup.string().required().email('Invalid email'),
});
