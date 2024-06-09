import { Component } from '@angular/core';

@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent {

  public activeTemplate: string = 'personalData';

  public showTemplate( templateName: string ):void {
    this.activeTemplate = templateName;
  }

 
}
