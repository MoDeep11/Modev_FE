export interface SignupProps {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface EmailCheckProps {
  code: String;
}

export interface EmailSendProps {
  email: String;
}
