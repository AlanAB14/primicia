import { Component, OnInit, inject } from '@angular/core';
import { Comision } from 'src/app/interfaces/comision.interface';
import { Pregunta } from 'src/app/interfaces/preguntas.interface';
import { Tasa } from 'src/app/interfaces/tasas.interface';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { TasasService } from 'src/app/services/tasas.service';

@Component({
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit{
  cargandoData: boolean = false;
  preguntasService = inject(PreguntasService)
  tasasService = inject(TasasService)
  comisionesService = inject(ComisionesService)
  preguntas!: Pregunta[];
  tasas!: Tasa[];
  comisiones!: Comision[];

  ngOnInit(): void {
    this.getPreguntas();
    this.getTasas();
    this.getComisiones();
  }

  getPreguntas() {
    this.cargandoData = true;
    this.preguntasService.getPreguntas()
      .subscribe(preguntas => {
        this.preguntas = preguntas;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getTasas() {
    this.cargandoData = true;
    this.tasasService.getTasas()
      .subscribe( tasas => {
        this.tasas = tasas;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getComisiones() {
    this.cargandoData = true;
    this.comisionesService.getComisiones()
      .subscribe( comisiones => {
        this.comisiones = comisiones;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }
}
