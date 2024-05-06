import { Property } from '../interface/property.interface';
import { PropertiesService } from './../services/properties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public properties: Property[] = [];

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.propertiesService.getProperties()
      .subscribe(properties => this.properties = properties);
  }
}

