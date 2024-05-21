import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-tasa-fecha',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title>Editar Fecha Tasa</h2>
  <mat-dialog-content>
    <form [formGroup]="tasasForm" class="form-tasas">      

    <mat-form-field>
      <input matInput formControlName="fecha_actualizacion" (dateChange)="onFechaChange()" [matDatepicker]="picker">
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    
  </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarTasa()" cdkFocusInitial [disabled]="tasasForm.invalid || tasasForm.pristine">Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-tasa-fecha.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTasaFechaComponent {
  
  fb = inject(FormBuilder);

  tasasForm: FormGroup = this.fb.group({
    fecha_actualizacion: [ this.data ? this.data.fecha_actualizacion : '', Validators.required],
  })

  ngOnInit(): void {
    console.log(this.data)
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onFechaChange() {
    const fecha = moment(this.tasasForm.value.fecha_actualizacion).toDate()
    this.tasasForm.patchValue({
      fecha_actualizacion: fecha
    })
  }

  guardarTasa() {
    if (!this.tasasForm.valid) {
      console.log('No es válido');
      this.tasasForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.tasasForm.value)
  }
}
