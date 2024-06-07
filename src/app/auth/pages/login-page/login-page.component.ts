
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/app/environments/environments';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginData } from '../../interfaces/loginData.interface';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  loginForm: FormGroup = this.formBuilder.group({});
  passwordErrorMessage: string | null = null;
  private readonly baseUrl: string = environment.baseUrl;
  @ViewChild('failLogin') failLogin!: TemplateRef<any>;
  @ViewChild('errorServer') errorServer!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private router: Router,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    this.loginForm.controls['password'].valueChanges.subscribe(() => {
      this.passwordErrorMessage = this.validatorsService.isValidPassField(this.loginForm, 'password');
    });
  }

  onBlur(): void {
    const emailControl = this.loginForm.get('email');
    if (emailControl) {
      emailControl.markAsTouched();
    }
  }

  onSubmitLogin() {
    if (this.loginForm && this.loginForm.valid) {
      const LoginData= this.loginForm.value;
      this.authService.login(LoginData).subscribe(
        (resp: LoginResponse) => {
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          let errorMessage = 'Ha ocurrido un error desconocido';
          if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor';
            this.dialog.open(this.errorServer);
          } else if (error.status === 401) {
            errorMessage = 'Credenciales incorrectas';
            this.dialog.open(this.failLogin);
          }
        }
      );
    }
  }
}


//TODO: hacer login, y una vez en perfil de admin, redirigir a Laravel.
// onSubmitLogin() {
//   if (this.loginForm && this.loginForm.valid) {
//     const { email, password, rememberMe } = this.loginForm.value;
//     const userType = 'admin_user';
//     this.authService.login(email, password, userType).subscribe(
//       (resp: LoginResponse) => {
//         const token = resp.token;
//         const user = resp.user;

//         if (rememberMe) {
//           localStorage.setItem('token', token);
//           localStorage.setItem('user', JSON.stringify(user));
//         }


//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));

//         if (user.user_type === 'admin') {

//           (document.getElementById('tokenForm') as HTMLFormElement).action = `${this.baseUrl}/loginAdmin`;

//           (document.getElementById('tokenInput') as HTMLInputElement).value = token;
//           // Envía el formulario
//           (document.getElementById('tokenForm') as HTMLFormElement).submit();



//         } else {
//           this.router.navigate(['/home']); // Redirigir a la ruta de Angular para usuarios normales
//         }
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
// }





