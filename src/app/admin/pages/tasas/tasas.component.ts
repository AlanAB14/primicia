import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasa } from 'src/app/interfaces/tasas.interface';
import { TasasService } from 'src/app/services/tasas.service';
import { DialogTasaComponent } from '../../components/dialog-tasa/dialog-tasa.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.scss'],
})
export class TasasComponent implements OnInit{
  cargandoData: boolean = false;
  tasasService = inject(TasasService)
  tasasArr!: any;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasas();
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

  editarPregunta(tasa: Tasa, id: number) {
    this.tasasService.updateTasa(tasa, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Tasa editada con éxito', '', 'success');
      this.getTasas();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar tasa', '', 'error');
    })
  }
}
