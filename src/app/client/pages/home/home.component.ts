import { Component, inject } from '@angular/core';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  promociones!: Promocion[];
  cargandoData: boolean = false;
  private promocionService = inject(PromocionService)

  ngOnInit(): void {
    this.cargandoData = true;
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        console.log(promociones[0].texto)
        this.promociones = promociones
        this.cargandoData = false;
      },
        (error) => {
          console.log(error)
          this.cargandoData = false;
        })
  }
}
