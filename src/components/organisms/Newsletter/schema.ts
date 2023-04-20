import * as yup from 'yup';

export const FormSchema = yup.object({
  name: yup.string().min(10, 'Invalid name').required(),
  email: yup.string().required().email('Invalid email'),
});
