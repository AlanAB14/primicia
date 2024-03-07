import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import Swal from 'sweetalert2';
import { DialogComerciosComponent } from '../../components/dialog-comercios/dialog-comercios.component';

@Component({
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent {
  fb = inject(FormBuilder);
  tarjetaService = inject(TarjetaService);
  cargandoData: boolean = false;
  tarjetaForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    domicilio: ['', Validators.required],
    ciudad: ['', Validators.required],
    dni: ['', Validators.required],
    ingresos: ['', Validators.required],
    filial: ['', Validators.required],
    mensaje: ['', Validators.required],
  })

  constructor( public dialog: MatDialog ) { }

  checkFieldError(campo: string) {
    if (this.tarjetaForm.get(campo)!.invalid && (this.tarjetaForm.get(campo)!.dirty || this.tarjetaForm.get(campo)!.touched)) {
      return true;
    }
    return false;
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.tarjetaForm.get(input)!.setValue(valor);
  }

  onKeyDown(event: KeyboardEvent) {
    const tecla = event.key;
    const esNumero = /[0-9]/.test(tecla);
    const esTeclaControl = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(tecla);

    if (!esNumero && !esTeclaControl) {
      event.preventDefault();
    }
  }

  sendData() {
    console.log(this.tarjetaForm.value)
    if (!this.tarjetaForm.valid) {
      console.log('No es valido')
      this.marcarTodosLosCamposComoTouched(this.tarjetaForm)
      return
    }
    this.cargandoData = true
    this.tarjetaService.createSolicitudTarjeta(this.tarjetaForm.value)
      .subscribe((resp: any) => {
        console.log(resp)
        if (resp.id) {
          Swal.fire({
            icon: 'success',
            text: 'Tu solicitud se ha cargado con exito',
            showConfirmButton: true,
          })
          this.cargandoData = false
          this.tarjetaForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error, comuniquesé con nosotros',
            showConfirmButton: true,
          })
          this.cargandoData = false
          this.tarjetaForm.reset();
        }
      }, (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error, comuniquesé con nosotros',
          showConfirmButton: true,
        })
        this.cargandoData = false
        this.tarjetaForm.reset();
      })
  }

  marcarTodosLosCamposComoTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.marcarTodosLosCamposComoTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  openDialog(tipo: string) {
    const dialogRef = this.dialog.open(DialogComerciosComponent, {
      data: tipo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
