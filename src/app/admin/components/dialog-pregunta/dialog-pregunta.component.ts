import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-dialog-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: `<h2 mat-dialog-title> {{ data ? 'Editar Pregunta' : 'Nueva Pregunta' }} </h2>
  <mat-dialog-content>
    <form [formGroup]="preguntasForm" class="form-preguntas">

      <mat-form-field class="example-full-width">
        <mat-label>Pregunta</mat-label>
        <input matInput formControlName="pregunta">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Respuesta</mat-label>
        <input matInput formControlName="respuesta">
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="guardarPregunta()" cdkFocusInitial>Guardar</button>
  </mat-dialog-actions>`,
  styleUrls: ['./dialog-pregunta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPreguntaComponent {
  fb = inject(FormBuilder);

  preguntasForm: FormGroup = this.fb.group({
    pregunta: [ this.data && this.data.pregunta ? this.data.pregunta.pregunta : '', Validators.required],
    respuesta: [  this.data && this.data.pregunta ? this.data.pregunta.respuesta : '', Validators.required],
  })

  ngOnInit(): void {
    console.log(this.data)
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  guardarPregunta() {
    if (!this.preguntasForm.valid) {
      console.log('No es válido');
      this.preguntasForm.markAllAsTouched();
      return
    }
    this.dialogRef.close(this.preguntasForm.value)
  }
}
