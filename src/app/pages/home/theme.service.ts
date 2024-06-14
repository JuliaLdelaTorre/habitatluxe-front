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

  constructor() {
    // Initialize lightMode based on localStorage
    const savedMode = localStorage.getItem('mode');
    this._lightMode = savedMode !== null ? JSON.parse(savedMode) : true;
    this.lightModeSubject = new BehaviorSubject(this._lightMode);
  }
  
  toggleLightMode(): boolean {
    this._lightMode = !this._lightMode;
    this.lightModeSubject.next(this._lightMode);
    localStorage.setItem('mode', JSON.stringify(this._lightMode));
    return this._lightMode;
  }

  get lightMode(): boolean {
    return this._lightMode;
  }
}
