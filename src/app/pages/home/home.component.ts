import { Component, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements AfterViewInit{

  constructor(private renderer: Renderer2) { }



  ngAfterViewInit(): void {
    this.loadAnimeJS().then(() => {
      // Anime.js se ha cargado correctamente
      this.executeAnimeCode();
    }).catch(() => {
      console.error('Error al cargar Anime.js');
    });
  }

  private loadAnimeJS(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/animejs/lib/anime.min.js';
      script.type = 'text/javascript'; // o 'module' dependiendo del formato del script
  
      script.onload = () => {
        resolve();
      };
  
      script.onerror = (error: ErrorEvent) => {
        reject(error);
      };
  
      this.renderer.appendChild(document.body, script);
    });
  }

  private executeAnimeCode(): void {
    this.loadScript('assets/js/script.js').then(() => {
      console.log('Script cargado exitosamente');
    }).catch(() => {
      console.error('Error al cargar el script');
    });
  }



  private loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'module';
      script.src = src;
      script.defer = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error: ErrorEvent) => {
        reject(error);
      };
      this.renderer.appendChild(document.body, script);
    });
  }
}