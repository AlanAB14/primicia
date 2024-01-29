import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasa } from 'src/app/interfaces/tasas.interface';
import { TasasService } from 'src/app/services/tasas.service';
import { DialogTasaComponent } from '../../components/dialog-tasa/dialog-tasa.component';
import Swal from 'sweetalert2';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { DialogComisionComponent } from '../../components/dialog-comision/dialog-tasa.component';
import { Comision } from 'src/app/interfaces/comision.interface';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss'],
})
export class ComisionesComponent implements OnInit{
  cargandoData: boolean = false;
  comisionesService = inject(ComisionesService)
  tasasArr!: any;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasas();
  }

  getTasas() {
    this.cargandoData = true;
    this.comisionesService.getComisiones()
      .subscribe(
        (tasas: any) => {
          this.tasasArr = tasas;
          console.log(this.tasasArr);
        },
        (error) => {
          console.log(error);
        }
      );
    this.cargandoData = false;
  }

  editTasa(tasa: any) {
    const dialogRef = this.dialog.open(DialogComisionComponent, {
      data: { tasa }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPregunta(result, tasa.id);
      }
    });
  }

  editarPregunta(comision: Comision, id: number) {
    this.comisionesService.updateComision(comision, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Comisión editada con éxito', '', 'success');
      this.getTasas();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar comisión', '', 'error');
    })
  }
}
