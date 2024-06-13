import { Component} from '@angular/core';
import { ThemeService } from 'src/app/pages/home/theme.service';

import { of, Subject } from 'rxjs';
@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  

  lightMode: boolean = true;
  lightModeSubject!: Subject<boolean>;
  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.lightModeSubject.subscribe( value => {
      this.lightMode = value;
    })
  }

}
