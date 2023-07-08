export interface SendAccessKeyDTO {
  email?: string;
  authenticationToken?: string;
}

export interface ValidateAccessKeyDTO {
  code?: string;
  email?: string;
  authenticationToken?: string;
}
