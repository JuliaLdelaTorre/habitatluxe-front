
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/app/environments/environments';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  loginForm: FormGroup = this.formBuilder.group({});
  passwordErrorMessage: string | null = null;
  
  private readonly baseUrl: string = environment.baseUrl;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(validators.email)]],
    password: ['', [Validators.required]]
  });
  }

ngOnInit(): void {
  this.loginForm.controls['password'].valueChanges.subscribe(() => {
    this.passwordErrorMessage = this.validatorsService.isValidPassField(this.loginForm, 'password');
  });
}

onSubmitLogin() {
  if (this.loginForm && this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    const userType = 'admin_user';
    this.authService.login(email, password, userType).subscribe(
      (resp: LoginResponse) => {
        const token = resp.token;
        const user = resp.user;


        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        if (user.user_type === 'admin') {
         
          (document.getElementById('tokenForm') as HTMLFormElement).action = `${this.baseUrl}/home`;
          
          (document.getElementById('tokenInput') as HTMLInputElement).value = token;
          // Envía el formulario
          (document.getElementById('tokenForm') as HTMLFormElement).submit();
          


        } else {
          this.router.navigate(['/home']); // Redirigir a la ruta de Angular para usuarios normales
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}


}




