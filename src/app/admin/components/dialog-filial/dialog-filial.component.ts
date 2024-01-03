import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-filial',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title> {{ data && data.filial ? 'Editar Filial' : 'Nueva Filial' }} </h2>
  <mat-dialog-content>
    <form [formGroup]="filialForm" class="form-filial">

      <mat-form-field class="example-full-width">
        <mat-label>Localidad</mat-label>
        <input matInput formControlName="localidad">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Dirección</mat-label>
        <input matInput formControlName="direccion">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Teléfono</mat-label>
        <input matInput (keydown)="onKeyDown($event)" formControlName="telefono">
      </mat-form-field>

    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarFilial()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-filial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFilialComponent {
  fb = inject(FormBuilder);

  filialForm: FormGroup = this.fb.group({
    localidad: [ this.data && this.data.filial ? this.data.filial.localidad : '', Validators.required],
    direccion: [  this.data && this.data.filial ? this.data.filial.direccion : '', Validators.required],
    email: [ this.data && this.data.filial ? this.data.filial.email : '', [Validators.required, Validators.email]],
    telefono: [ this.data && this.data.filial ? this.data.filial.telefono : '', Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  guardarFilial() {
    if (!this.filialForm.valid) {
      console.log('No es válido');
      this.filialForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.filialForm.value)
  }

  validarNumeros() {
    let numero = this.filialForm.get('telefono')!.value;
    console.log(numero)
    numero = numero.replace(/[^0-9]/g, '');
    this.filialForm.patchValue({ numero: numero });
  }

  onKeyDown(event: KeyboardEvent) {
    const tecla = event.key;
    const esNumero = /[0-9]/.test(tecla);
    const esEspacio = tecla === ' ';
    const esParentesis = tecla === '(' || tecla === ')';
    const esMas = tecla === '+';
    const esTeclaControl = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(tecla);

    if (!esNumero && !esTeclaControl  && !esEspacio && !esParentesis && !esMas) {
      event.preventDefault();
    }
  }
}
