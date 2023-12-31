export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  fullname: string;
  telephone: string;
  email: string;
  password: string;
  recaptcha: string;
}

export interface IForgot {
  recaptcha?: string;
  platform?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  token?: string | undefined;
}
