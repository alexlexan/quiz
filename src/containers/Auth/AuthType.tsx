export type AuthValidation = {
  required: boolean;
  email?: boolean;
  minLength?: number;
};

export type AuthFormControl = {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: AuthValidation;
};

export type AuthFormControls = {
  email: AuthFormControl;
  password: AuthFormControl;
};

export type AuthFormControlsArray = Array<keyof AuthFormControls>;

export type AuthState = {
  isFormValid: boolean;
  formControls: AuthFormControls;
};

export type AuthProps = {
  auth(email: string, password: string, isLogin: boolean): Promise<void>;
};
