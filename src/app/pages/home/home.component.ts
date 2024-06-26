import { Component, ElementRef, OnInit, AfterViewInit, HostListener, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { of, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  // isAuthenticated$ = this.authService.isAuthenticated$;
  // currentUser$ = this.authService.currentUser$;
  // public userName: string | null = null;

  lightMode: boolean = true;
  lightModeSubject!: Subject<boolean>;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.themeService.lightModeSubject.subscribe( value => {
      this.lightMode = value;
    })
  }

  crossActive: boolean = false;

  ngOnInit(): void {
    this.adjustAccordingToScreenSize();
    // this.userName = this.authService.getUserName();
  }

  toggleLightMode(): void {
    this.themeService.toggleLightMode();
  }

  // logout() {
  //   this.authService.logout();
  // }


  ngAfterViewInit(): void {
    this.initializeAnimation();
  }

  private initializeAnimation(): void {
    const objectSVG = this.elementRef.nativeElement.querySelector('#objectSVG');
    objectSVG.addEventListener('load', () => {
      const svgDocument = objectSVG.contentDocument;
      const puerta = svgDocument.getElementById('puerta');
      const marco = svgDocument.getElementById('marco-puerta');
      const centerX = svgDocument.getElementById('circulo2').getBBox().x + svgDocument.getElementById('circulo2').getBBox().width / 2;
      const centerY = svgDocument.getElementById('circulo2').getBBox().y + svgDocument.getElementById('circulo2').getBBox().height / 2;
      const texto = svgDocument.getElementById('texto');


      anime({
        targets: texto,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 7000,
        delay: function(el, i) { return i * 100 },
        direction: 'alternate',
        loop: true
      });

      anime({
        targets: [
          svgDocument.getElementById('circulo2'),
          svgDocument.getElementById('path59'),
          svgDocument.getElementById('rect8'),
          svgDocument.getElementById('rect7')
        ],
        scale: {
          value: 1.12,
          duration: 2000,
        },
        easing: 'linear',
        loop: true,
        direction: 'alternate',
        update: (animation) => {
          animation.animatables.forEach((animatable) => {
            animatable.target.style.transformOrigin = `${centerX}px ${centerY}px`;
          });
        },
      });
      this.animarPuerta(puerta, marco, svgDocument);
    });
  }

  private animarPuerta(puerta: SVGElement, marco: SVGElement, svgDocument: Document): void {
    anime({
      targets: [puerta, marco],
      fill: '#9c813f',
      duration: 2500,
      easing: 'easeInOutQuad',
      opacity: 1,

      complete: () => {
        anime({
          targets: puerta,
          fill: '#57371f',
          rotateY: '-115deg',
          rotateZ: '+2deg',
          duration: 2000,
          easing: 'easeInOutQuad',
          update: () => {
            const doorRight = (puerta as SVGGraphicsElement).getBBox().x +  (puerta as SVGGraphicsElement).getBBox().width;
            puerta.style.transformOrigin = `${doorRight}px 50%`;
          },
          complete: () => {
            anime({
              targets: [puerta, marco],
              opacity: 0,
              duration: 3000,
              easing: 'linear',
              complete: () => {
                anime({
                  targets: [puerta],
                  rotateY: '0deg',
                  rotateZ: '0deg',
                  fill: '#9c813f',
                  complete: () => {
                    this.animarPuerta(puerta, marco, svgDocument); // Recursivamente reinicia la animación
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  pressBars() {
    document.body.style.overflowY = "hidden";
    document.getElementById("container")!.classList.add('nav-header__container--expanded');
    document.getElementById("bars")!.style.display = "none";
    document.getElementById("cross")!.style.display = "block";
    this.crossActive = true;
    document.getElementById("list-container")!.classList.add('nav-header__container__list__container--expanded', 'nav-header__container__list--visible');
  }

  pressCross() {
    document.body.style.overflowY = "auto";
    document.getElementById("container")!.classList.remove('nav-header__container--expanded');
    document.getElementById("bars")!.style.display = "block";
    document.getElementById("cross")!.style.display = "none";
    this.crossActive = false;
    document.getElementById("list-container")!.classList.remove('nav-header__container__list__container--expanded', 'nav-header__container__list--visible');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustAccordingToScreenSize();
  }

  adjustAccordingToScreenSize() {
    const displayWidth = window.innerWidth;

    if (displayWidth < 942) {
      if (!this.crossActive) {
        document.getElementById("bars")!.style.display = "block";
      }
    } else {
      document.body.style.overflowY = "auto";
      document.getElementById("container")!.classList.remove('nav-header__container--expanded');
      document.getElementById("cross")!.style.display = "none";
      this.crossActive = false;
      document.getElementById("list-container")!.classList.remove('nav-header__container__list__container--expanded', 'nav-header__container__list--visible');
      document.getElementById("bars")!.style.display = "none";
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Escape" && this.crossActive) {
      this.pressCross();
    }
  }


  // @ViewChild('moon') moonImg!: ElementRef;
  // @ViewChild('sun') sunImg!: ElementRef;

  // togglelightMode(): void {
  //   this.lightMode = !this.lightMode;
  //   this.lightModeSubject.next(this.lightMode);
  //    if(this.lightMode) {
  //       this.moonImg.nativeElement.style.display = 'block';
  //       this.sunImg.nativeElement.style.display = 'none';
  //     } else {
  //       this.moonImg.nativeElement.style.display = 'none';
  //       this.sunImg.nativeElement.style.display = 'block';
  //     }
  // }
}
