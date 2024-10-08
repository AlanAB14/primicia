import { Component, OnInit, inject } from '@angular/core';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { FilialesService } from 'src/app/services/filiales.service';

@Component({
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  cargandoData: boolean = false;
  filiales!: Filial[];
  receptorias!: Filial[];
  items: any[] = new Array(10).fill(null);
  filialesService = inject(FilialesService)

  ngOnInit(): void {
    this.cargandoData = true
    this.filialesService.getFiliales()
      .subscribe(filiales => {
        this.receptorias = filiales.filter(filial => filial.receptoria === 1);
        this.filiales = filiales.filter(filial => filial.receptoria === 0);
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getSubtitle(localidad: string) {
    switch (localidad) {
      case 'Alcorta':
        return 'Alcorta Bochas Club Mutual, Social y Deportivo'
      case 'Carmen':
        return 'Asociación Mutual entre socios del Club Atlético Sportman'
      case 'Elortondo':
        return 'Club Atlético Peñarol Mutual Social y Biblioteca'
      case 'María Teresa':
        return 'Asociación Mutual del Club Belgrano'
      case 'Melincué':
        return 'Club Atlético Peñarol Mutual Social y Biblioteca'
      case 'Sancti Spíritu':
        return 'Mutual de Socios Belgrano Football Club'
      case 'Santa Isabel':
        return 'Asociación Mutual del Club Belgrano'
      case 'Teodelina':
        return 'Asociación Mutual entre Socios de Racing Club de Teodelina'
      default:
        return 'Mutual Entre Asociados de Cooperación Mutual Patronal';
    }
  }
}
