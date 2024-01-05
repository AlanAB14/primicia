import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-comercio',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title> {{ data.comercio ? 'Editar Comercio' : 'Nuevo Comercio' }} </h2>
  <mat-dialog-content>
    <form [formGroup]="comercioForm" class="form-comercio">

      <mat-form-field class="example-full-width">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Dirección</mat-label>
        <input matInput formControlName="direccion">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Categoria</mat-label>
        <mat-select formControlName="categoriaId">
            <mat-option *ngFor="let categoria of data.categorias" [value]="categoria.id" >{{categoria.categoria}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Filial</mat-label>
        <mat-select formControlName="filialId">
            <mat-option *ngFor="let filial of data.filiales" [value]="filial.id" >{{filial.localidad}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Promoción</mat-label>
        <mat-select formControlName="promocionId">
            <mat-option [value]="0"></mat-option>
            <mat-option *ngFor="let promocion of data.promociones" [value]="promocion.id">{{promocion.promocion}}</mat-option>
        </mat-select>
      </mat-form-field>


    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarComercio()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-comercio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComercioComponent implements OnInit {
  fb = inject(FormBuilder);

  comercioForm: FormGroup = this.fb.group({
    nombre: [ this.data.comercio ? this.data.comercio.nombre : '', Validators.required],
    categoriaId: [ this.data.comercio ? this.data.comercio.categoriaId : '', Validators.required],
    direccion: [ this.data.comercio ? this.data.comercio.direccion : '', Validators.required],
    filialId: [ this.data.comercio ? this.data.comercio.filialId : '', Validators.required],
    promocionId: [ (this.data.comercio && this.data.comercio.promocionId ) ? this.data.comercio.promocionId : null]
  })

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  guardarComercio() {
    if (!this.comercioForm.valid) {
      console.log('No es válido');
      this.comercioForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.comercioForm.value)
  }


}
