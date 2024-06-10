
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
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  showEmails: boolean = false;


  loginForm: FormGroup = this.formBuilder.group({});
  passwordErrorMessage: string | null = null;
  private readonly baseUrl: string = environment.baseUrl;
  @ViewChild('failLogin') failLogin!: TemplateRef<any>;
  @ViewChild('errorServer') errorServer!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      password: ['', [Validators.required]],
      remember: [false]
    });

    const rememberToken = this.cookieService.get('remember_token');
    console.log(rememberToken);
    if (!rememberToken) {
      console.log('No hay token en la cookie');}

    this.getRememberEmails();
    this.autoLogin();

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

  getRememberEmails(): void {
    const emails = localStorage.getItem('emails');
    if (emails) {
      this.showEmails = true;
    }
  }

  // Verifica si hay credenciales almacenadas en el LocalStorage
  autoLogin() {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      this.loginForm?.patchValue({
        email: storedEmail,
        password: storedPassword,
        remember: true // Marca automáticamente la casilla "Recuérdame"
      });
      // Envía automáticamente la solicitud de inicio de sesión
      this.onSubmitLogin();
    }
  }



  onSubmitLogin() {
    if (this.loginForm && this.loginForm.valid) {
      const LoginData = this.loginForm.value;
      console.log(LoginData);
      this.authService.login(LoginData).subscribe(
        (resp: LoginResponse) => {
          const userType = this.authService.getUserType();
          console.log('usertype: ', userType);
          if ( userType === 'admin') {
            this.router.navigate(['/auth/admin']);
          } else if ( userType === 'normal_user') {
            this.router.navigate(['/home']);
          } else if ( userType === 'seller_user') {
            this.router.navigate(['/home']); // Cambiar a la ruta de vendedor.
          } else {
            this.router.navigate(['/home']);
          }
          
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




