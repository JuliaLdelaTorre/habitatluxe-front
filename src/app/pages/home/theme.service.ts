import { ElementRef, Injectable, ViewChild } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _lightMode: boolean = true;
  lightModeSubject: Subject<boolean> = new BehaviorSubject(this._lightMode);


  @ViewChild('moon') moonImg!: ElementRef;
  @ViewChild('sun') sunImg!: ElementRef;

  // activar/desactivar el modo claro.
  toggleLightMode(): boolean {
    this._lightMode = !this._lightMode;
    this.lightModeSubject.next(this._lightMode);
    return this._lightMode;
  }
}
