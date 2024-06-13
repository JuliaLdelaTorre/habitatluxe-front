import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import * as validators from '../../../shared/validators/validators';
import { phone } from '../../../shared/validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public profile: Profile | null = null;
  public activeTemplate: string = 'personalData';
  public profileForm: FormGroup = this.fb.group({});
  public passwordErrorMessage: string | null = null;
  public password_confirmationErrorMessage: string | null = null;
  @ViewChild('successUpdate') successRegister!: TemplateRef<any>;
  @ViewChild('failUpdate') failRegister!: TemplateRef<any>;
  @ViewChild('successDelete') successDelete!: TemplateRef<any>;
  @ViewChild('failDelete') failDelete!: TemplateRef<any>;



  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(validators.email)]],
      phone: ['', [Validators.required, Validators.pattern(validators.phone)]],
      currentPassword: ['', [Validators.required, Validators.pattern(validators.password)]],
      password: ['', [Validators.required, Validators.pattern(validators.password)]],
      password2: ['', [Validators.required, Validators.pattern(validators.password)]],
    });

    this.profileForm.controls['password'].valueChanges.subscribe(() => {
      this.passwordErrorMessage = this.validatorsService.isValidPassField(this.profileForm, 'password');
    });

    this.profileForm.controls['password2'].valueChanges.subscribe(() => {
      this.password_confirmationErrorMessage = this.validatorsService.isValidPassField(this.profileForm, 'password2');
    });

// Muestro los valores actuales del usuario.
    this.loadProfileData();


  } // ngOnInit

  public loadProfileData():void {
  this.profileService.getProfile().subscribe(
    (response: any) => {
      if (response.message === 'userProfile OK' && response.userData) {
        const userProfile = response.userData;
        console.log(userProfile);
        this.profileForm.patchValue({
          username: userProfile.username,
          email: userProfile.email,
          phone: userProfile.phone // Asegúrate de ajustar según la estructura real
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
    if (this.profileForm.valid) {
      if (this.profile && this.profile.user_id) {
      const updatedProfile = {
        ...this.profile,
        ...this.profileForm.value
      };

      this.profileService.updateProfile(updatedProfile)
        .subscribe(
          (response: Profile) => {
            this.dialog.open(this.successRegister);
            this.profile = response;
          },
          (error: any) => {
            this.dialog.open(this.failRegister);
          }
        );
      }
    }
  }

  onDeleteAccount(): void {
    if (confirm('¿Estás seguro/a de que quieres borrar tu cuenta?')) {
      const userId = this.profile?.user_id;
      if (userId !== undefined) {
        this.profileService.deleteProfile(userId).subscribe(
          () => {
            console.log('Cuenta eliminada');
            // Puedes añadir lógica adicional si es necesario, como redirigir al usuario a otra página
          },
          (error) => {
            console.error('Error al eliminar la cuenta', error);
            // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje de error al usuario
          }
        );
      }
    }
  }


} //
