import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Property } from '../interface/property.interface';
import { PropertyResponse } from '../interface/propertyResponse.interface';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styles: [
  ]
})
export class PropertyPageComponent implements OnInit {
// cuando el componente se monta, hay un momento que no hay property, por eso sería nulo?.
  public property?: Property;
  public currentImageIndex: number = 0;
  public imageList: string[] = [];


  constructor(
    private propertiesService: PropertiesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.propertiesService.getPropertyById(id)),)
      .subscribe( (response:any) => {
        if (!response) {
          this.router.navigateByUrl('/properties');
        return;
        }
        this.property = response.data;
        this.imageList = this.property?.images || []; // Check if this.property is defined before assigning its value to this.imageList
        console.log('imagenes:', this.imageList);

       console.log('Propiedad:' , this.property);
          return;

      });
  }


  // Controles para el carrusel de imágenes
  nextImage() {
    if (this.currentImageIndex < this.imageList.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Vuelve al inicio cuando llega al final
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.imageList.length - 1; // Vuelve al final cuando llega al inicio
    }
  }


goBack(): void {
  this.router.navigateByUrl('/properties');
}

}
