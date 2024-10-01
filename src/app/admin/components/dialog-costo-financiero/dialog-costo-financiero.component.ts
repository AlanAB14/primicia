import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-costo-financiero',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title> Editar </h2>
  <mat-dialog-content>
    <form [formGroup]="costoFinancieroForm" class="form-tasas">

      <mat-form-field class="example-full-width">
        <mat-label>Porcentaje</mat-label>
        <input matInput formControlName="percentage">
      </mat-form-field>

    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarTasa()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-costo-financiero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCostoFinancieroComponent {
  fb = inject(FormBuilder);

  costoFinancieroForm: FormGroup = this.fb.group({
    percentage: [  this.data ? this.data.tasa.percentage : '', Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  guardarTasa() {
    if (!this.costoFinancieroForm.valid) {
      console.log('No es válido');
      this.costoFinancieroForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.costoFinancieroForm.value)
  }
}
