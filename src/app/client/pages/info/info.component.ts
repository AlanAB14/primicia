import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Comision } from 'src/app/interfaces/comision.interface';
import { Tasa } from 'src/app/interfaces/tasas.interface';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { TasasService } from 'src/app/services/tasas.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit{
  cargandoData: boolean = false;
  tasasService = inject(TasasService)
  comisionesService = inject(ComisionesService)
  cdr = inject(ChangeDetectorRef)
  tasas!: Tasa[];
  tasasFecha!: string;
  comisiones!: Comision[];
  
  ngOnInit(): void {
    this.getTasas();
    this.getTasasFecha();
    this.getComisiones();
  }

  getTasas() {
    this.cargandoData = true;
    this.tasasService.getTasas()
      .subscribe( tasas => {
        this.tasas = tasas;
        this.cargandoData = false;
        this.cdr.detectChanges();
      }, (error) => {
        console.log('Error en getTasas', error);
        this.cargandoData = false;
        this.cdr.detectChanges();
      })
  }

  getTasasFecha() {
    this.cargandoData = true;
    this.tasasService.getTasasFecha()
      .subscribe( (tasasFecha: any) => {
        this.tasasFecha = tasasFecha[0].fecha_actualizacion;
        this.cargandoData = false;
        this.cdr.detectChanges();
      }, (error) => {
        console.log('Error en getTasasFecha', error);
        this.cargandoData = false;
        this.cdr.detectChanges();
      })
  }

  getComisiones() {
    this.cargandoData = true;
    this.comisionesService.getComisiones()
      .subscribe( comisiones => {
        this.comisiones = comisiones;
        this.cargandoData = false;
        this.cdr.detectChanges();
      }, (error) => {
        console.log('Error en getComisiones', error);
        this.cargandoData = false;
        this.cdr.detectChanges();
      })
  }
}
