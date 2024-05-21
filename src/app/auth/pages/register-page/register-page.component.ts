import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  * as validatorsPatterns from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
// el orden es: valor por defecto, validaciones sincronas, validaciones asincronas.
    name: ['', [ Validators.required, Validators.pattern(validatorsPatterns.namePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(validatorsPatterns.emailPattern) ]],
    password: ['', [ Validators.required, Validators.pattern(validatorsPatterns.passwordPatern) ]],
    password2: ['', [ Validators.required, Validators.pattern(validatorsPatterns.passwordPatern) ]],

    // dejo aqui para probar si me vale con el pattern, si ingresa menos de 6 caracteres
    //  password: ['', [Validators.required, Validators.minLength(6)]],

  })

  constructor( private fb: FormBuilder) { }

  isValidField( field: string ) {
    // TODO: Obtener validación desde un servicio
  }

  onSubmitRegister() {
    this.registerForm.markAllAsTouched();
  }

}
