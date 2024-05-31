import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  * as validators from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
// el orden es: valor por defecto, validaciones sincronas, validaciones asincronas.
    name: ['', [ Validators.required, Validators.pattern(validators.name) ]],
    email: ['', [ Validators.required, Validators.pattern(validators.email) ]],
    password: ['', [ Validators.required, Validators.pattern(validators.password) ]],
    password2: ['', [ Validators.required, Validators.pattern(validators.password) ]],

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
