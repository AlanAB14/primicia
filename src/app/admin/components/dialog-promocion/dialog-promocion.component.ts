import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatCheckboxModule
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


    <input type="file" 
           #f_input_image
           accept="image/png, image/gif, image/jpeg"
           hidden
           (change)="uploadFile($event)">
    <div class="media-box">
      <button class="btn-media" mat-raised-button (click)="f_input_image.click()">Cambiar Image</button>
      <img class="service-image" [src]="promocionForm.value.image ? ('data:image/png;base64,' + promocionForm.value.image) : ''">
    </div>

    <div class="check">
      <mat-checkbox color="primary" formControlName="tieneContador" class="example-margin">Tiene Contador</mat-checkbox>
    </div>

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
    fechaInicio: [this.data && this.data.promocion ? moment(this.data.promocion.fechaInicio).toDate() : '', Validators.required],
    fechaFin: [this.data && this.data.promocion ? moment(this.data.promocion.fechaFin).toDate() : '', Validators.required],
    diasPromocion: [this.data && this.data.promocion ? this.data.promocion.diasPromocion : '', Validators.required],
    promocion: [this.data && this.data.promocion ? this.data.promocion.promocion : '', Validators.required],
    texto: [this.data && this.data.promocion ? this.data.promocion.texto : ''],
    image: [this.data && this.data.promocion && this.data.promocion.image ? this.data.promocion.image : ''],
    tieneContador: [this.data ? this.data.promocion.tieneContador : true],
  })


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    console.log('Data', this.data.promocion)
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

  uploadFile(event: any) {
    this.imageBlob(event)
      .then((result: any) => {
        this.promocionForm.controls['image'].setValue(result.split(',')[1])
        this.promocionForm.get('image')?.markAsDirty();
        console.log(this.promocionForm.value.image)
        this.cdRef.detectChanges();
      })
      .catch(err => console.log(err))
  }

  imageBlob(event: any) {
    const files: FileList = event.target.files;
    const file: File = files[0];

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(file);
    })
  }

}
