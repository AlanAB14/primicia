import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CostoFinanciero } from 'src/app/interfaces/costoFinanciero.interface';
import { TasasService } from 'src/app/services/tasas.service';
import { DialogCostoFinancieroComponent } from '../../components/dialog-costo-financiero/dialog-costo-financiero.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-costo-financiero',
  templateUrl: './costo-financiero.component.html',
  styleUrls: ['./costo-financiero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostoFinancieroComponent {
  cargandoData: boolean = false;
  tasasService = inject(TasasService);
  cdrService = inject(ChangeDetectorRef);
  costoFinancieroArr!: CostoFinanciero[];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCostoFinanciero();
  }

  getCostoFinanciero() {
    this.cargandoData = true;
    this.tasasService.getCostoFinanciero()
      .subscribe(
        (cf) => {
          this.costoFinancieroArr = cf;
          console.log(this.costoFinancieroArr)
          this.cdrService.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      );
      this.cargandoData = false;
  }

  editTasa(tasa: any) {
    const dialogRef = this.dialog.open(DialogCostoFinancieroComponent, {
      data: { tasa }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPregunta(result, tasa.id);
      }
    });
  }

  editarPregunta(comision: CostoFinanciero, id: number) {
    this.tasasService.updateCostoFinanciero(comision.percentage, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Costo financiero editado con éxito', '', 'success');
      this.getCostoFinanciero();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar costo financiero', '', 'error');
    })
  }
}
