import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Promocion } from 'src/app/interfaces/promocion.interface';

@Component({
  selector: 'app-promociones-carousel',
  templateUrl: './promociones-carousel.component.html',
  styleUrls: ['./promociones-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocionesCarouselComponent implements OnInit {
  @Input() promociones!: Promocion[];

  ngOnInit(): void {
    console.log(this.promociones)
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    dots: false
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4,
    //     mouseDrag: false
    //   }
    // },
  }
}
