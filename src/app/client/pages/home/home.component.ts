import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  promociones!: Promocion[];
  cargandoData: boolean = false;
  @ViewChild('carousel') carousel!: any;
  private promocionService = inject(PromocionService)

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   // Llamamos a la función para reiniciar el carousel
  //   this.restartCarousel();
  // }

  ngOnInit(): void {
    this.cargandoData = true;
    this.promocionService.getPromocionesConImagen()
      .subscribe(promociones => {
        console.log(promociones[0])
        this.promociones = promociones
        this.cargandoData = false;
      },
        (error) => {
          console.log(error)
          this.cargandoData = false;
        })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 700,
    autoplayTimeout: 3500,
    autoplaySpeed: 600,
    margin: 100,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1100: {
        items: 1,
      }
    },
  }
  

  // restartCarousel() {
  //   // Reiniciamos el carousel accediendo a su API
  //   this.carousel.owlCarousel('destroy');
  //   this.carousel.owlCarousel(this.customOptions);
  // }
}
