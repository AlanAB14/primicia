import { Component, OnInit, inject } from '@angular/core';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { FilialesService } from 'src/app/services/filiales.service';

@Component({
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit{
  cargandoData: boolean = false;
  filiales!: Filial[];
  items: any[] = new Array(10).fill(null);
  filialesService = inject(FilialesService)

  ngOnInit(): void {
    this.cargandoData = true
    this.filialesService.getFiliales()
      .subscribe( filiales => {
        this.filiales = filiales;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }
}
