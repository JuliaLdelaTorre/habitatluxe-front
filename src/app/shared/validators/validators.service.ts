import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  isValidPassField(form: FormGroup, field: string): string | null {

    const password = form.controls[field];
    const passwordLength = "(?=.{6,})";
    const passwordLowercase = "(?=.*[a-z])";
    const passwordUppercase = "(?=.*[A-Z])";
    const passwordNumber = "(?=.*[0-9])";
    const passwordSpecialChar = "(?=.*[!@#\$%\^&\*/])";

    if (!password.value.match(passwordLength)) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!password.value.match(passwordLowercase)) {
      return 'La contraseña debe tener al menos una letra minúscula';
    }
    if (!password.value.match(passwordUppercase)) {
      return 'La contraseña debe tener al menos una letra mayúscula';
    }
    if (!password.value.match(passwordNumber)) {
      return 'La contraseña debe tener al menos un número';
    }
    if (!password.value.match(passwordSpecialChar)) {
      return 'La contraseña debe tener al menos un caracter especial';
    }
    return null;
  }





 mustMatch(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('password2');
  if (!password || !confirmPassword) return null;
 console.log('passwords do not match', password?.value, confirmPassword?.value);
  return password.value === confirmPassword.value ? null : { passwordsMismatch: true };

}

}
