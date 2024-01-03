import { Component, OnInit, inject } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/preguntas.interface';
import { Tasa } from 'src/app/interfaces/tasas.interface';
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
  preguntas!: Pregunta[];
  tasas!: Tasa[];

  ngOnInit(): void {
    this.getPreguntas();
    this.getTasas();
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
}
