import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasa } from 'src/app/interfaces/tasas.interface';
import { TasasService } from 'src/app/services/tasas.service';
import { DialogTasaComponent } from '../../components/dialog-tasa/dialog-tasa.component';
import Swal from 'sweetalert2';
import { DialogTasaFechaComponent } from '../../components/dialog-tasa-fecha/dialog-tasa-fecha.component';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.scss'],
})
export class TasasComponent implements OnInit{
  cargandoData: boolean = false;
  tasasService = inject(TasasService)
  tasasArr!: any;
  tasasFech!: Date;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasas();
    this.getTasasFecha();
  }

  getTasas() {
    this.cargandoData = true;
    this.tasasService.getTasas()
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

  getTasasFecha() {
    this.cargandoData = true;
    this.tasasService.getTasasFecha()
      .subscribe((tasasFec: any) => {
        this.tasasFech = tasasFec[0].fecha_actualizacion;
        console.log(this.tasasFech)
      }, (error) => {
        console.log(error)
      })
      this.cargandoData = false;
  }

  editTasa(tasa: any) {
    const dialogRef = this.dialog.open(DialogTasaComponent, {
      data: { tasa }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPregunta(result, tasa.id);
      }
    });
  }

  editTasaFec(fecha_actualizacion: any) {
    const dialogRef = this.dialog.open(DialogTasaFechaComponent, {
      data: { fecha_actualizacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarTasaFec(result);
      }
    });
  }

  editarPregunta(tasa: Tasa, id: number) {
    this.tasasService.updateTasa(tasa, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Tasa editada con éxito', '', 'success');
      this.getTasas();
      this.getTasasFecha();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar tasa', '', 'error');
    })
  }

  editarTasaFec(tasaFec: any) {
    this.tasasService.updateTasaFecha(tasaFec)
    .subscribe(resp => {
      Swal.fire('Fecha editada con éxito', '', 'success');
      this.getTasas();
      this.getTasasFecha();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar fecha', '', 'error');
    })
  }
}
