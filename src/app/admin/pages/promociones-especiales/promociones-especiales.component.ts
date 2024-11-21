import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { PromocionEspecialService } from 'src/app/services/promocionEspecial.service';
import Swal from 'sweetalert2';
import { DialogPromocionComponent } from '../../components/dialog-promocion/dialog-promocion.component';
import { HabilitarFuncionService } from 'src/app/services/habilitarFuncion.service';
import { Funcion } from 'src/app/interfaces/funcion';

@Component({
  selector: 'app-promociones-especiales',
  templateUrl: './promociones-especiales.component.html',
  styleUrls: ['./promociones-especiales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocionesEspecialesComponent {
  cargandoData: boolean = false;
  promociones!: Promocion[];
  funcionPromocionesEspeciales!: Funcion;
  isSpecial: boolean = true;
  promocionEspecialService = inject(PromocionEspecialService);
  habilitarFuncionService = inject(HabilitarFuncionService);
  cdrService = inject(ChangeDetectorRef);
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHabilitarFuncion();
    this.getPromocionesEspeciales();
  }

  getHabilitarFuncion() {
    this.cargandoData = true;
    this.habilitarFuncionService.getHabilitarFuncion(1)
      .subscribe(funcion => {
        this.funcionPromocionesEspeciales = funcion;
        this.cargandoData = false;
        this.cdrService.detectChanges();
      }, (error) => {
        console.log(error)
        this.cargandoData = false;
        this.cdrService.detectChanges();
      })

  }

  getPromocionesEspeciales() {
    this.cargandoData = true;
    this.promocionEspecialService.getPromocionesConImagen()
      .subscribe(promociones => {
        this.promociones = promociones;
        this.cdrService.detectChanges();
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  addPromocion() {
    const isSpecial = this.isSpecial;
    const dialogRef = this.dialog.open(DialogPromocionComponent, {data: {isSpecial}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.agregarPromocion(result);
      }
    });
  }

  showModal() {
    Swal.fire({
      title: `¿Estás seguro de ${!this.funcionPromocionesEspeciales.activated ? 'mostrar' : 'ocultar'} las promociones especiales?`,
      showCancelButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        const funcion: Funcion = {
          id: this.funcionPromocionesEspeciales.id,
          nombre: this.funcionPromocionesEspeciales.nombre,
          activated: !this.funcionPromocionesEspeciales.activated
        }
        this.habilitarFuncionService.updateHabilitarFuncion(funcion)
          .subscribe(resp => {
            Swal.fire(`Promoción especial ${!this.funcionPromocionesEspeciales.activated ? 'mostradas' : 'ocultadas'} con éxito`, '', 'success')
            this.getHabilitarFuncion();
          }, (error) => {
            Swal.fire('Error al ocultar/mostrar promoción especial', '', 'error')
            console.log(error)
          })
      }
    });
  }

  agregarPromocion(promocion: Promocion) {
    this.promocionEspecialService.addPromocion(promocion)
      .subscribe(resp => {
        Swal.fire('Promoción Especial agregada con éxito', '', 'success');
        this.getPromocionesEspeciales();
      }, (error) => {
        console.log(error)
        Swal.fire('Error al agregar promoción especial', '', 'error');
      })
  }

  editPromocion(promocion: Promocion) {
    const isSpecial = this.isSpecial;
    const dialogRef = this.dialog.open(DialogPromocionComponent, {
      data: { promocion, isSpecial }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPromocion(result, promocion.id);
      }
    });
  }

  editarPromocion(promocion: Promocion, id: number) {
    this.promocionEspecialService.updatePromocion(promocion, id)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire('Promoción especial editada con éxito', '', 'success');
        this.getPromocionesEspeciales();
      }, (error) => {
        console.log(error)
        Swal.fire('Error al editar promoción especial', '', 'error');
      })
  }

  deletePromocion(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar la promoción especial?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionEspecialService.deletePromocion(id)
          .subscribe(resp => {
            Swal.fire('Promoción especial eliminada con éxito', '', 'success')
            this.getPromocionesEspeciales();
          }, (error) => {
            Swal.fire('Error al eliminar promoción especial', 'Verifique que la promoción especial no tenga comercios adheridos', 'error')
            console.log(error)
          })
      }
    });
  }
}
