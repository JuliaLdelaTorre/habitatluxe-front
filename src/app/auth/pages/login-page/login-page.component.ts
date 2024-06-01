import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { email, password } from '../../../shared/validators/validators';
import { LoginResponse } from '../../interfaces/loginResponse.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // Formulario reactivo.
  loginForm: FormGroup = this.formBuilder.group({});



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      password: ['', [Validators.required]]
    });
  }

  isValidPassField(field: string): string | null {
    const password = this.loginForm.controls[field];
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


  onSubmitLogin() {
    if (this.loginForm && this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (resp: LoginResponse) => {
          const token = resp.token;
          const user = resp.user;
          console.log(user);

          if (user.user_type === 'admin') {
            this.router.navigate(['/blog']);
            return;
          } else {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            this.router.navigate(['/home']);
          }


        },
        (error) => {
          console.log(error);
        }
      )


    }
  }




}
