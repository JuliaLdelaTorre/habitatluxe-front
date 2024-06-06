import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../../shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/register.interface';
import { password } from '../../../shared/validators/validators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public registerForm: FormGroup = this.fb.group({});
  public passwordErrorMessage: string | null = null;
  public password_confirmationErrorMessage: string | null = null;
  @ViewChild('successRegister') successRegister!: TemplateRef<any>;

  // dejo aqui para probar si me vale con el pattern, si ingresa menos de 6 caracteres
  //  password: ['', [Validators.required, Validators.minLength(6)]],

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    public dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(validators.name)]],
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.passwordErrorMessage = this.validatorsService.isValidPassField(this.registerForm, 'password');
    });

      this.registerForm.controls['password_confirmation'].valueChanges.subscribe(() => {
        this.password_confirmationErrorMessage = this.validatorsService.isValidPassField(this.registerForm, 'password_confirmation');
      });

  }
//TODO: añadir dialogo de confirmación de registro.
  onSubmitRegister(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const { username, email, password, password_confirmation } = this.registerForm.value;

      if (password !== password_confirmation) {
        this.passwordErrorMessage = 'Las contraseñas no coinciden';
        return;
      }
      this.passwordErrorMessage = null;
      this.authService.register(username, email, password).subscribe(
        (resp: Register) => {
          this.registerForm.reset();

          this.dialog.open(this.successRegister);

        },
        (error) => {
          console.error('Error durante el registro:', error);
        }
      );
    } else {
      console.log("Formulario inválido", this.registerForm.errors, this.registerForm.value);

    }
  }
//TODO: REVISAR ESTILO DEL DIALOG.
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(this.successRegister, dialogConfig);
  }

} //

