import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/register.interface';
import { password } from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  public registerForm: FormGroup = this.fb.group({});
  public passwordErrorMessage: string | null = null;
  public password_confirmationErrorMessage: string | null = null;

    // dejo aqui para probar si me vale con el pattern, si ingresa menos de 6 caracteres
    //  password: ['', [Validators.required, Validators.minLength(6)]],

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(validators.name)]],
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
    }

  ngOnInit(): void {
    // this.registerForm.controls['password'].valueChanges.subscribe(() => {
    //   this.passwordErrorMessage = this.validatorsService.isValidPassField(this.registerForm, 'password');
    // });

    //   this.registerForm.controls['password_confirmation'].valueChanges.subscribe(() => {
    //     this.password_confirmationErrorMessage = this.validatorsService.isValidPassField(this.registerForm, 'password_confirmation');
    //   });

  }

    onSubmitRegister(): void {
    console.log("Formulario enviado");
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const { username, email, password, password_confirmation } = this.registerForm.value;
      console.log("Formulario válido", this.registerForm.value);

      if (password !== password_confirmation) {
        this.passwordErrorMessage = 'Las contraseñas no coinciden';
        console.log(this.passwordErrorMessage);
        return;
      }

      this.passwordErrorMessage = null;

      console.log("Enviando solicitud de registro");
      this.authService.register(username, email, password).subscribe(
        (resp: Register) => {
          console.log("Respuesta de registro:", resp);
        },
        (error) => {
          console.error('Error durante el registro:', error);
        }
      );
    } else {
      console.log("Formulario inválido", this.registerForm.errors);

    }
  }
}

