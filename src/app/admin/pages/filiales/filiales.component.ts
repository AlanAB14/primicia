import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { FilialesService } from 'src/app/services/filiales.service';
import { DialogFilialComponent } from '../../components/dialog-filial/dialog-filial.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filiales',
  templateUrl: './filiales.component.html',
  styleUrls: ['./filiales.component.scss'],
})
export class FilialesComponent implements OnInit {
  filialesService = inject(FilialesService);
  filiales!: Filial[];
  cargandoData: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFiliales();
  }

  getFiliales() {
    this.cargandoData = true;
    this.filialesService.getFiliales()
      .subscribe(filiales => {
        this.filiales = filiales
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  editFilial(filial: Filial) {
    const dialogRef = this.dialog.open(DialogFilialComponent, {
      data: { filial }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarFilial(result, filial.id);
      }
    });
  }

  editarFilial(filial: Filial, id: number) {
    this.filialesService.updateFilial(id, filial)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Filial editada con éxito', '', 'success');
      this.getFiliales();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar filial', '', 'error');
    })
  }


  deleteFilial(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar la filial?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.filialesService.deleteFilial(id)
          .subscribe(resp => {
            Swal.fire('Filial eliminada con éxito', '', 'success')
            this.getFiliales();
          }, (error) => {
            Swal.fire('Error al eliminar filial', 'Verifique que la filial no tenga comercios adheridos','error')
            console.log(error)
          })
      }
    });
  }

  addFilial() {
    const dialogRef = this.dialog.open(DialogFilialComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.agregarFilial(result);
      }
    });
  }

  agregarFilial(filial: Filial) {
    this.filialesService.addFilial(filial)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Filial agregada con éxito', '', 'success');
      this.getFiliales();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al agregar filial', '', 'error');
    })
  }
}
