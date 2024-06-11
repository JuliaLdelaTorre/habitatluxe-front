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
  toggleLightMode(): void {
    this._lightMode = !this._lightMode;
    this.lightModeSubject.next(this._lightMode);
     if(this._lightMode) {
        this.moonImg.nativeElement.style.display = 'block';
        this.sunImg.nativeElement.style.display = 'none';
      } else {
        this.moonImg.nativeElement.style.display = 'none';
        this.sunImg.nativeElement.style.display = 'block';
      }
  }

 

}
