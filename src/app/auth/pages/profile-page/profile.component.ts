import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import * as validators from '../../../shared/validators/validators';
import { phone } from '../../../shared/validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent implements OnInit {

  // public profile?: Profile | null = null;
  profile: any;
  userId: any;
  public activeTemplate: string = 'personalData';
  public profileForm: FormGroup = this.fb.group({});
  public passwordErrorMessage: string | null = null;
  public password2ErrorMessage: string | null = null;
  @ViewChild('successUpdate') successUpdate!: TemplateRef<any>;
  @ViewChild('failUpdate') failUpdate!: TemplateRef<any>;
  @ViewChild('successDelete') successDelete!: TemplateRef<any>;
  @ViewChild('failDelete') failDelete!: TemplateRef<any>;


  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['',],
      email: ['', Validators.pattern(validators.email)],
      phone: ['', Validators.pattern(validators.phone)],
      currentPassword: ['', Validators.pattern(validators.password)],
      password: ['', Validators.pattern(validators.password)],
      password2: ['', Validators.pattern(validators.password)],
    });

    this.profileForm.controls['password'].valueChanges.subscribe(() => {
      this.passwordErrorMessage = this.validatorsService.isValidPassField(this.profileForm, 'password');
    });

    this.profileForm.controls['password2'].valueChanges.subscribe(() => {
      this.password2ErrorMessage = this.validatorsService.isValidPassField(this.profileForm, 'password2');
    });

    // Muestro los valores actuales del usuario.
    this.loadProfileData();


  } // ngOnInit

  public loadProfileData(): void {
    this.profileService.getProfile().subscribe(
      (response: any) => {
        if (response.message === 'userProfile OK' && response.userData) {
          const profile = response.userData;
          console.log('perfil del usuario:', profile);
          this.profile = profile;
          this.userId = profile.id;
          console.log('id de usuario desde load profile:', this.userId);
          this.profileForm.patchValue({
            username: profile.username,
            email: profile.email,
            phone: profile.phone
          });
        } else {
          console.error('Error: Respuesta del servidor incorrecta');
        }
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  // templates.
  showTemplate(template: string) {
    this.activeTemplate = template;
    if (template === 'changePass') {
      this.profileForm.controls['currentPassword'].setValidators([Validators.required]);
      this.profileForm.controls['password'].setValidators([Validators.required]);
      this.profileForm.controls['password2'].setValidators([Validators.required]);
    } else {
      this.profileForm.controls['currentPassword'].clearValidators();
      this.profileForm.controls['password'].clearValidators();
      this.profileForm.controls['password2'].clearValidators();
    }
    this.profileForm.controls['currentPassword'].updateValueAndValidity();
    this.profileForm.controls['password'].updateValueAndValidity();
    this.profileForm.controls['password2'].updateValueAndValidity();
  }

  onSubmitUpdate() {

    // Comprueba la validez del formulario
    if (!this.profileForm.valid) {
      console.log('Formulario inválido');
      console.log('Errores de validación:', this.profileForm.errors);

      // Recorre los controles del formulario e imprime los errores individuales
      Object.keys(this.profileForm.controls).forEach(key => {
        const controlErrors = this.profileForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log('Errores en el control', key, ':', controlErrors);
        }
      });

      return; // Sale del método si el formulario es inválido
    }

    if (this.profile && this.profileForm.valid) {
      console.log('Datos enviados:', this.profileForm.value);
      const updatedProfile = {
        ...this.profile,
        ...this.profileForm.value
      };
      const password = this.profileForm.value.password;
      const password2 = this.profileForm.value.password2;

      if (password !== password2) {
        this.passwordErrorMessage = 'Las contraseñas no coinciden';
        return;
      }
      this.passwordErrorMessage = null;

      this.profileService.updateProfile(updatedProfile)
        .subscribe(
          (response: Profile) => {
            this.profile = response;
            this.dialog.open(this.successUpdate);
            this.profileForm.reset();
          },
          (error: any) => {
            console.error('Error al actualizar el perfil:', error);
            this.dialog.open(this.failUpdate);
          }
        );
    }
  }

  onDeleteAccount(): void {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
      if (!this.profile) {
        console.error('El perfil no está definido');
        return;
      }
      if (this.userId !== undefined) {
        this.profileService.deleteProfile(this.userId).subscribe(
          () => {
            console.log('Cuenta eliminada');
            this.dialog.open(this.successDelete);
            this.authService.logout();
            if (this.cookieService.check('remember_token')) {
              this.cookieService.delete('remeber_token');
            }
          },
          (error) => {
            console.error('Error al eliminar la cuenta', error);
            this.dialog.open(this.failDelete);
          }
        );
      }
    }
  }

} //
