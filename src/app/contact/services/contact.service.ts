import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/app/environments/environments";
import { Contact } from "../interface/contact.interface";
import { name } from '../../shared/validators/validators';
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class ContactService {

  private baseUrl = environment.baseUrl;

  constructor( private http: HttpClient) { }

  // POST del formulario de contacto.
 sendContactForm(name: string, phone: string, email: string, comment: string): Observable<Contact> {
  const body = { name, phone, email, comment };
  const url = `${this.baseUrl}/form`;
  // Ajustar la llamada para incluir { observe: 'response' }
  return this.http.post<Contact>(url, body);
}





} //
