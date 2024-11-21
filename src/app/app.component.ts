import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HabilitarFuncionService } from './services/habilitarFuncion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'primicia';
  cargandoData: boolean = true;
  private habilitarFuncionService = inject(HabilitarFuncionService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getFuncionesHabilitadas();
  }

  getFuncionesHabilitadas() {
    this.cargandoData = true;
    this.habilitarFuncionService.getHabilitarFunciones()
      .subscribe(funciones => {
        this.habilitarFuncionService.setFunciones(funciones);
        this.cargandoData = false;
        this.cdr.detectChanges();
      }, (error) => {
        console.error(error);
        this.cargandoData = false;
        this.cdr.detectChanges();
      })
  }
}
