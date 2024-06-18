import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit{
  cargandoData: boolean = false;
  promociones: Promocion[] = [];
  promocionService = inject(PromocionService);
  router = inject(Router)
  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones() {
    this.cargandoData = true;
    this.promociones = [];
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        console.log(promociones)
        this.asignaPromocionesConContador(promociones)
        this.cargandoData = false
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  asignaPromocionesConContador(promociones: any) {
    promociones.forEach((promocion: any) => {
      if (promocion.tieneContador) {
        this.promociones.push(promocion)
      }
    });
  }

  goToComercios(promocion: number) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['comercios', { c: btoa(JSON.stringify(promocion)) }]));
    window.open(`${url}`, '_self');
  }
}
