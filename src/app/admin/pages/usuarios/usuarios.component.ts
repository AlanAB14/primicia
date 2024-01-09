import { Component, ViewChild, inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  cargandoData: boolean = false;
  id!: number;
  super_admin!: boolean;
  usuarios: any[] = [];
  displayedColumns: string[] = ['user', 'super_admin', 'actions'];
  dataSource!: MatTableDataSource<any>;

  usuariosService = inject(UsuariosService)

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService) {
    this.getUsuarios();
  }

  reestablecerContrasenia() {
    Swal.fire({
      title: `Reestablecer Contraseña`,
      showCancelButton: true,
      html:
        '<div class="inputs-ta-swal">' +
        `<input type="password" placeholder="Ingresa nueva contraseña" id="swal-input1"></input>` +
        `<input type="password" placeholder="Ingresa contraseña nuevamente" id="swal-input2"></input>` +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1'),
          document.getElementById('swal-input2')
        ]
      }
    }).then((result) => {
      if (result.isConfirmed && (result.value[0].value === result.value[1].value) && (result.value[0].value !== '' && result.value[1].value !== '')) {
        const body = {
          password: result.value[0].value,
        }
        this.usuariosService.updateUsuario(this.id, body)
          .subscribe((resp: any) => {
            Swal.fire('', 'Contraseña modificada con éxito', 'success')
            this.authService.logout()
          },
          (error) => {
            Swal.fire('', 'Ocurrió un error al modificar contraseña', 'error');
            console.log(error)
          })
      }else if(result.isConfirmed && (result.value[0].value !== result.value[1].value)) {
        Swal.fire('', 'Las contraseñas no coinciden', 'error');
      }
    })
  }

  agregarUsuario() {
    Swal.fire({
      title: `Agregar Usuario`,
      showCancelButton: true,
      html:
        '<div class="inputs-ta-swal">' +
        `<input type="text" placeholder="Ingresa nombre de usuario" id="swal-input1"></input>` +
        `<input type="password" placeholder="Ingresa contraseña de usuario" id="swal-input2"></input>` +
        `<label style="margin-top: .5rem">Administrador</label><input type="checkbox" id="swal-input3"></input>` +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1'),
          document.getElementById('swal-input2'),
          document.getElementById('swal-input3')
        ]
      }
    }).then((result) => {
      if (result.isConfirmed && result.value[0].value && result.value[1].value) {
        console.log(result.value[0].value, result.value[1].value, result.value[2].checked)
        let super_admin = result.value[2].checked ? "1" : "0"
        const body = {
          user: result.value[0].value,
          password: result.value[1].value,
          super_admin
        }
        console.log(body)
        this.usuariosService.addUsuario(body)
          .subscribe((resp: any) => {
            Swal.fire('', 'Usuario agregado con éxito', 'success')
            this.getUsuarios();
          },
          (error) => {
            Swal.fire('', 'Ocurrió un error al agregar usuario', 'error');
            console.log(error)
          })
      }else if(result.isConfirmed && (!result.value[0].value || !result.value[1].value)) {
        Swal.fire('', 'Debes completar todos los campos', 'error');
      }
    })
  }

  ngOnInit(): void {
    this.id = this.authService.getId();
    this.super_admin = this.authService.getSuperAdmin();
  }

  getUsuarios() {
    this.cargandoData = true
    this.usuariosService.getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp
        console.log(resp)
        this.dataSource = new MatTableDataSource(resp);
        this.cargandoData = false;
      })
  }

  updateUsuario(id: number, data: any) {
    this.cargandoData = true;
    this.usuariosService.updateUsuario(id, data)
      .subscribe( (resp) => {
        this.getUsuarios();
        Swal.fire('Usuario editado con éxito','','success')
      },(error) => {
        Swal.fire('Ocurrió un error al editar usuario','','error')
        console.log(error)
      })
  }

  removeUsuario(id: number) {
    this.cargandoData = true
    this.usuariosService.deleteUsuario(id)
    .subscribe( (resp) => {
      this.getUsuarios();
      Swal.fire('Usuario eliminado con éxito','','success')
    },(error) => {
      Swal.fire('Ocurrió un error al eliminar usuario','','error')
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(element: any) {
    Swal.fire({
      title: `${element.super_admin ? 'Quieres quitar el usuario de la lista de administradores?': 'Quieres agregar el usuario a la lista de administradores?'}`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        let super_admin = !element.super_admin;
        const body = {
          super_admin
        }
        this.updateUsuario(element.id, body);
      }
    })
  }

  deleteUser(id: number) {
    Swal.fire({
      title: `Quieres eliminar el usuario?`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.removeUsuario(id);
      }
    })
  }
  
}
