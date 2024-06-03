import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  public registerForm: FormGroup = this.fb.group({});
  public passwordErrorMessage: string | null = null;


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
      password2: ['', [Validators.required]],
    });
    }

  ngOnInit(): void {
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.passwordErrorMessage = this.validatorsService.isValidPassField(this.registerForm, 'password');
    });
  }


  onSubmitRegister() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm && this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe(
        (resp: Register) => {
          console.log(resp);
        }
      )
    }
  }
}
