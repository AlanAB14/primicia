import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-comision',
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
        <input matInput formControlName="comisionTitulo">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Importe</mat-label>
        <input matInput formControlName="comisionImporte">
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
export class DialogComisionComponent {
  
  fb = inject(FormBuilder);

  tasasForm: FormGroup = this.fb.group({
    comisionTitulo: [ this.data ? this.data.tasa.comisionTitulo : '', Validators.required],
    comisionImporte: [  this.data ? this.data.tasa.comisionImporte : '', Validators.required],
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
