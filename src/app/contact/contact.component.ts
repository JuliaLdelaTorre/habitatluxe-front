import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ContactService } from './services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as valid from '../shared/validators/validators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent {

  public contactForm: FormGroup = this.fb.group({});
  @ViewChild('successForm') successForm!: TemplateRef<any>
  @ViewChild('failForm') failForm!: TemplateRef<any>

  constructor(
     private contactService: ContactService,
     private fb: FormBuilder,
     public dialog: MatDialog,

    ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [ Validators.required, Validators.pattern(valid.phone) ]],
      email: ['', [ Validators.required, Validators.pattern(valid.email)  ]],
      comment: ['',[ Validators.required, Validators.minLength(10), Validators.maxLength(1000)] ]
    });
  }


  sendForm() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const { name, phone, email, comment } = this.contactForm.value;
      this.contactService.sendContactForm(name, phone, email, comment)

        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.contactForm.reset();
            this.dialog.open(this.successForm);
          },
          error: (error) => {
            console.error('Error durante el envío:', error);
            this.dialog.open(this.failForm);
          }
        });
    } else {
      console.log('Formulario no válido');
    }
  }

  // openDialog() {
  // const dialogForm = new MatDialogConfig();
  // dialogForm.disableClose = true;
  // this.dialog.open(this.successForm, dialogForm);
  // }


 } //
