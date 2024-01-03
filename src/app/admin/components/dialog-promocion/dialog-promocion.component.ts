import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-promocion',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  template: `<h2 mat-dialog-title> {{ data && data.filial ? 'Editar Promoción' : 'Nueva Promoción' }} </h2>
  <mat-dialog-content>
    <form [formGroup]="promocionForm" class="form-filial">

      <mat-form-field class="example-full-width">
        <mat-label>Promoción</mat-label>
        <input matInput formControlName="promocion">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Días de Promoción</mat-label>
        <input matInput formControlName="diasPromocion">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Texto</mat-label>
        <input matInput formControlName="texto">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Rango de Fechas</mat-label>
        <mat-date-range-input [rangePicker]="picker">
          <input formControlName="fechaInicio" (dateChange)="onFechaSeleccionadaInicioChange()" [min]="minDate" matStartDate>
          <input formControlName="fechaFin" (dateChange)="onFechaSeleccionadaFinChange()" [min]="minDateFin" matEndDate>
      </mat-date-range-input>
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker [startAt]="fechaPrimerDia"></mat-date-range-picker>
    </mat-form-field>



    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarPromocion()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-promocion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPromocionComponent { 
  fb = inject(FormBuilder);

  minDate: Date = new Date();
  minDateFin!: Date;
  fechaPrimerDia = new Date();


  promocionForm: FormGroup = this.fb.group({
    fechaInicio: [ this.data && this.data.promocion ? moment(this.data.promocion.fechaInicio).toDate() : '', Validators.required],
    fechaFin: [  this.data && this.data.promocion ? moment(this.data.promocion.fechaFin).toDate() : '', Validators.required],
    diasPromocion: [ this.data && this.data.promocion ? this.data.promocion.diasPromocion : '', Validators.required],
    promocion: [ this.data && this.data.promocion ? this.data.promocion.promocion : '', Validators.required],
    texto: [ this.data && this.data.promocion ? this.data.promocion.texto : ''],
  })


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  guardarPromocion() {
    if (!this.promocionForm.valid) {
    console.log(this.promocionForm.value)
      console.log('No es válido');
      this.promocionForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.promocionForm.value)
  }

  onFechaSeleccionadaInicioChange() {
    const fechaInicioDate = moment(this.promocionForm.value.fechaInicio).toDate()
    this.promocionForm.patchValue({
      fechaInicio: fechaInicioDate
    })
  }

  onFechaSeleccionadaFinChange() {
    const fechaFinDate = moment(this.promocionForm.value.fechaFin).toDate()
    this.promocionForm.patchValue({
      fechaFin: fechaFinDate
    })
  }

}
