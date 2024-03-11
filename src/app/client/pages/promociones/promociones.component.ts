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
  promociones!: Promocion[];
  promocionService = inject(PromocionService);
  router = inject(Router)
  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones() {
    this.cargandoData = true;
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        this.promociones = promociones
        this.cargandoData = false
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  goToComercios(promocion: Promocion) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['comercios', { c: btoa(JSON.stringify(promocion.id)) }]));
    window.open(`${url}`, '_self');
  }
}
