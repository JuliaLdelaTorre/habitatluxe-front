import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Property } from '../interface/property.interface';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styles: [
  ]
})
export class PropertyPageComponent implements OnInit {

  public property?: Property;

  constructor(
    private propertiesService: PropertiesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(delay(500), switchMap(({ id }) => this.propertiesService.getPropertyById(id)),)
      .subscribe(property => {
        if (!property) this.router.navigateByUrl('/properties');

        this.property = property;
          return;

      });
  }

  // Carrusel
  // Asumiendo que tienes un array de imágenes en tu propiedad
  images = this.property!.img;

  // Índice de la imagen actual
  currentImageIndex = 0;

  // Función para ir a la imagen siguiente
  nextImage() {
    if (this.currentImageIndex < this.images!.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  // Función para ir a la imagen anterior
  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images!.length - 1;
    }
  }





goBack(): void {
  this.router.navigateByUrl('/properties');
}

}
