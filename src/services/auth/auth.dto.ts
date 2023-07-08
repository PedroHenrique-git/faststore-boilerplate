export interface SendAccessKeyDTO {
  email: string;
  authenticationToken: string;
}

export interface ValidateAccessKeyDTO {
  accessKey: string;
  email: string;
  authenticationToken: string;
}
