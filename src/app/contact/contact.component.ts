import { Component } from '@angular/core';
import { ContactService } from './services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as valid from '../shared/validators/validators';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent {

  public contactForm: FormGroup = this.fb.group({});


  constructor(
     private contactService: ContactService,
     private fb: FormBuilder
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
  if ( this.contactForm.valid ) {
    const { name, phone, email, comment } = this.contactForm.value;
    this.contactService.sendContactForm(name, phone, email, comment)
    .subscribe( resp => {console.log(resp);} );
    this.contactForm.reset();
  } else {
    console.log('Formulario no valido');
  }
}


}
