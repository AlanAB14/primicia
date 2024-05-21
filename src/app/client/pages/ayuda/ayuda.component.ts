import { Component, OnInit, inject } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/preguntas.interface';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit{
  cargandoData: boolean = false;
  preguntasService = inject(PreguntasService)
  preguntas!: Pregunta[];

  ngOnInit(): void {
    this.getPreguntas();
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


}
