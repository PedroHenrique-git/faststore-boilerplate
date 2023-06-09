import * as yup from 'yup';

export const EmailFormSchema = yup.object({
  email: yup.string().required().email('Invalid email'),
});

export const CodeFormSchema = yup.object({
  code: yup
    .string()
    .length(6, 'the code must be six characters long')
    .required(),
});
