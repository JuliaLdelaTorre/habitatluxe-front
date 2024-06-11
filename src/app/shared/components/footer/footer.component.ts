import { Component } from '@angular/core';
import { ThemeService } from 'src/app/pages/home/theme.service';


@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  lightMode: boolean = true;

  constructor( private themeService: ThemeService) { }





}
