import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { HabilitarFuncionService } from 'src/app/services/habilitarFuncion.service';
import { PromocionService } from 'src/app/services/promocion.service';
import { PromocionEspecialService } from 'src/app/services/promocionEspecial.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  promociones!: Promocion[];
  promocionesEspeciales!: Promocion[];
  showPromocionesEspeciales!: boolean;
  cargandoData: boolean = false;
  @ViewChild('carousel') carousel!: any;
  private promocionService = inject(PromocionService);
  private promocionEspecialService = inject(PromocionEspecialService);
  private habilitarFuncionService = inject(HabilitarFuncionService);

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   // Llamamos a la función para reiniciar el carousel
  //   this.restartCarousel();
  // }

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

  ngOnInit(): void {
    this.cargandoData = true;
    this.promocionService.getPromocionesConImagen()
      .subscribe(promociones => {
        this.promociones = promociones
        this.cargandoData = false;
      },
        (error) => {
          console.log(error)
          this.cargandoData = false;
        })
    if (this.habilitarFuncionService.funciones) {
      const funcionPromociones = this.habilitarFuncionService.funciones.find(funcion => funcion.nombre === 'promociones_especiales')
      if (funcionPromociones?.activated) {
        this.showPromocionesEspeciales = true;
        this.getPromocionesEspeciales();
      }
    }
  }

  getPromocionesEspeciales() {
    this.cargandoData = true;
    this.promocionEspecialService.getPromociones()
      .subscribe(promociones => {
        this.promocionesEspeciales = promociones;
        this.cargandoData = false;
      }, (error) => {
        console.error(error);
        this.cargandoData = false;
      })
  }

  openDocument() {
    const url = 'assets/data/sorteo-bases.pdf';
    window.open(url, '_blank');
  }


  // restartCarousel() {
  //   // Reiniciamos el carousel accediendo a su API
  //   this.carousel.owlCarousel('destroy');
  //   this.carousel.owlCarousel(this.customOptions);
  // }
}
