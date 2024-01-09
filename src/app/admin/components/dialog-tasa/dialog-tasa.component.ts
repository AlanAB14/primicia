import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-tasa',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title> {{ data ? 'Editar Pregunta' : 'Nueva Pregunta' }} </h2>
  <mat-dialog-content>
    <form [formGroup]="tasasForm" class="form-tasas">

      <mat-form-field class="example-full-width">
        <mat-label>Título</mat-label>
        <input matInput formControlName="tasaTitulo">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Descripción</mat-label>
        <textarea class="text-area" matInput formControlName="tasaDescripcion"></textarea>
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>TNA</mat-label>
        <input type="number" matInput formControlName="tna">
      </mat-form-field>
      
      <mat-form-field class="example-full-width">
        <mat-label>TEM</mat-label>
        <input type="number" matInput formControlName="tem">
      </mat-form-field>
      
      <mat-form-field class="example-full-width">
        <mat-label>CFT</mat-label>
        <input type="number" matInput formControlName="cft">
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarTasa()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-tasa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTasaComponent {
  
  fb = inject(FormBuilder);

  tasasForm: FormGroup = this.fb.group({
    tasaTitulo: [ this.data ? this.data.tasa.tasaTitulo : '', Validators.required],
    tasaDescripcion: [  this.data ? this.data.tasa.tasaDescripcion : '', Validators.required],
    tna: [  this.data ? this.data.tasa.tna : '', Validators.required],
    tem: [  this.data ? this.data.tasa.tem : '', Validators.required],
    cft: [  this.data ? this.data.tasa.cft : '', Validators.required],
  })

  ngOnInit(): void {
    console.log(this.data)
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  guardarTasa() {
    if (!this.tasasForm.valid) {
      console.log('No es válido');
      this.tasasForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.tasasForm.value)
  }
}
