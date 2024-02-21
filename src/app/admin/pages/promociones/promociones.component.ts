import { Component, OnInit, inject } from '@angular/core';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionService } from 'src/app/services/promocion.service';
import { DialogPromocionComponent } from '../../components/dialog-promocion/dialog-promocion.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesComponent implements OnInit {
  cargandoData: boolean = false;
  promociones!: Promocion[];
  promocionService = inject(PromocionService)

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones() {
    this.cargandoData = true;
    this.promocionService.getPromocionesConImagen()
      .subscribe(promociones => {
        this.promociones = promociones;
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  addPromocion() {
    const dialogRef = this.dialog.open(DialogPromocionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.agregarPromocion(result);
      }
    });
  }
  
  agregarPromocion(promocion: Promocion) {
    this.promocionService.addPromocion(promocion)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Promoción agregada con éxito', '', 'success');
      this.getPromociones();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al agregar promoción', '', 'error');
    })
  }

  editPromocion(promocion: Promocion) {
    const dialogRef = this.dialog.open(DialogPromocionComponent, {
      data: { promocion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPromocion(result, promocion.id);
      }
    });
  }

  editarPromocion(promocion: Promocion, id: number) {
    this.promocionService.updatePromocion(promocion, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Promoción editada con éxito', '', 'success');
      this.getPromociones();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar promoción', '', 'error');
    })
  }

  deletePromocion(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar la promoción?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionService.deletePromocion(id)
          .subscribe(resp => {
            Swal.fire('Promoción eliminada con éxito', '', 'success')
            this.getPromociones();
          }, (error) => {
            Swal.fire('Error al eliminar promoción', 'Verifique que la promoción no tenga comercios adheridos','error')
            console.log(error)
          })
      }
    });
  }
}
