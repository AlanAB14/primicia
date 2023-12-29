import { Component, inject } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = '';
  contactoService = inject(ContactoService)

  subcribir() {
    if (this.email === '') {
      return
    }
    const body = {
      email: this.email,
      motivo: 'Suscripción',
      nombre: '-',
      mensaje: '-'
    }
    this.contactoService.createContacto( body )
      .subscribe( (resp: any) => {
        console.log(resp)
        if (resp.id) {
          Swal.fire({
            icon: 'success',
            text: 'Tu solicitud se ha cargado con exito',
            showConfirmButton: true,
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error, comuniquesé con nosotros',
            showConfirmButton: true,
          })
        }
      }, (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error, comuniquesé con nosotros',
          showConfirmButton: true,
        })
      })
  }
}
