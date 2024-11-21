import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { HabilitarFuncionService } from 'src/app/services/habilitarFuncion.service';
import { PromocionService } from 'src/app/services/promocion.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { PromocionEspecialService } from 'src/app/services/promocionEspecial.service';

@Component({
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit{
  cargandoData: boolean = false;
  promociones: Promocion[] = [];
  promocionesEspeciales: Promocion[] = [];
  showPromocionesEspeciales!: boolean;
  promocionService = inject(PromocionService);
  promocionEspecialService = inject(PromocionEspecialService);
  habilitarFuncionService = inject(HabilitarFuncionService);
  router = inject(Router)

  async ngOnInit(): Promise<void> {
    try {
      this.cargandoData = true;
      const promociones = await lastValueFrom(this.promocionService.getPromociones());
      this.asignaPromocionesConContador(promociones);

      const showPromocionesEspeciales = await lastValueFrom(this.habilitarFuncionService.getHabilitarFuncion(1));
      this.showPromocionesEspeciales = showPromocionesEspeciales.activated

      if (this.showPromocionesEspeciales) {
        const promocionesEspeciales = await lastValueFrom(this.promocionEspecialService.getPromociones());
        this.asignaPromocionesEspecialesConContador(promocionesEspeciales);
      }

    } catch (error) {
      console.error('Error cargando datos', error);
      Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
    } finally {
      this.cargandoData = false;
    }
    this.getEnablePromocionesEspeciales();
  }

  getEnablePromocionesEspeciales() {
    this.cargandoData = true;
    this.habilitarFuncionService.getHabilitarFuncion(1)
      .subscribe(habilitada => {
        this.showPromocionesEspeciales = habilitada.activated;
        this.cargandoData = false;
      }, (error) => {
        console.error(error);
        this.cargandoData = false;
      })
  }

  getPromociones() {
    this.cargandoData = true;
    this.promociones = [];
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        this.asignaPromocionesConContador(promociones)
        this.cargandoData = false
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getPromocionesEspeciales() {
    this.cargandoData = true;
    this.promocionesEspeciales = [];
    this.promocionEspecialService.getPromociones()
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

  asignaPromocionesEspecialesConContador(promociones: any) {
    promociones.forEach((promocion: any) => {
      if (promocion.tieneContador) {
        this.promocionesEspeciales.push(promocion)
      }
    });
  }

  goToComercios(promocion: number) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['comercios', { c: btoa(JSON.stringify(promocion)) }]));
    window.open(`${url}`, '_self');
  }

  goToComerciosEspeciales(promocion: number) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['comercios', { ce: btoa(JSON.stringify(promocion)) }]));
    window.open(`${url}`, '_self');
  }
}
