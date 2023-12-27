import { Component, OnInit, inject } from '@angular/core';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesTemplateComponent implements OnInit{
  promociones!: Promocion[];
  cargandoData: boolean = true;
  private promocionService = inject(PromocionService)

  ngOnInit(): void {
    this.promocionService.getPromociones()
      .subscribe( promociones => {
        console.log(promociones[0].texto)
        this.cargandoData = false;
        this.promociones = promociones
      },
      (error) => {
        console.log(error)
        this.cargandoData = false;
      })
  }

  // promocionExpirada() {
  //   const date = new Date();
  //   console.log(this.promociones)
  //   if (this.promociones?.length > 0 && this.promociones[0].fechaFin < date) {
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }

}
