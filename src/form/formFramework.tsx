import { formControlsType } from "../store/reducers/create";

export function createControl<T>(
  config: T,
  validation: { [key: string]: boolean }
) {
  return {
    ...config,
    validation,
    valid: !validation,
    touch: false,
    value: "",
  };
}

export function validate(
  value,
  validation: { [key: string]: boolean } | null = null
) {
  if (!validation) {
    return true;
  }
  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  return isValid;
}

export function validateForm(formControls: formControlsType) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}
