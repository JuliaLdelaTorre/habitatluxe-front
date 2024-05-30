import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { email, password } from '../../../shared/validators/validators';

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
      password: ['', [Validators.required, Validators.pattern(validators.password)]]
    });
  }

  onSubmitLogin() {
    // if (this.loginForm && this.loginForm.valid) {
    //   this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
    //     (response) => {
    //       this.router.navigate(['/home']);
    //     },
    //     (error) => {
    //       console.log('Error al iniciar sesión', error);
    //     }
    //   );
    //   }
  }



}
