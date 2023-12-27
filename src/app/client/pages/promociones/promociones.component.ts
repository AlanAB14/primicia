import { Component, OnInit, inject } from '@angular/core';
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
  ngOnInit(): void {
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        this.promociones = promociones
      })
  }

}
