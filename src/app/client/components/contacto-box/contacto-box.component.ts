import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto-box',
  templateUrl: './contacto-box.component.html',
  styleUrls: ['./contacto-box.component.scss']
})
export class ContactoBoxComponent {
  fb = inject(FormBuilder);
  contactoService = inject(ContactoService);
  cargandoData: boolean = false;
  contactoForm: FormGroup = this.fb.group({
    motivo: ['', Validators.required],
    nombre: [''],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required]
  })

  sendData() {
    console.log(this.contactoForm.value)
    if (!this.contactoForm.valid) {
      console.log('No es valido')
      this.marcarTodosLosCamposComoTouched(this.contactoForm)
      return
    }
    this.cargandoData = true
    this.contactoService.createContacto(this.contactoForm.value)
      .subscribe((resp: any) => {
        console.log(resp)
        if (resp.id) {
          Swal.fire({
            icon: 'success',
            text: 'Tu solicitud se ha cargado con exito',
            showConfirmButton: true,
          })
          this.cargandoData = false
          this.contactoForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error, comuniquesé con nosotros',
            showConfirmButton: true,
          })
          this.cargandoData = false
          this.contactoForm.reset();
        }
      }, (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error, comuniquesé con nosotros',
          showConfirmButton: true,
        })
        this.cargandoData = false
        this.contactoForm.reset();
      })
  }

  checkFieldError(campo: string) {
    if (this.contactoForm.get(campo)!.invalid && (this.contactoForm.get(campo)!.dirty || this.contactoForm.get(campo)!.touched)) {
      return true;
    }
    return false;
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
}
