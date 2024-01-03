import { Component, OnInit, inject } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  cargandoData: boolean = false;
  categoriasService = inject(CategoriasService)
  categoriasArr!: any;

  ngOnInit(): void {
    this.getCategorias();

  }

  getCategorias() {
    this.cargandoData = true;
    this.categoriasService.getCategorias()
      .subscribe(
        (categorias: any) => {
          this.categoriasArr = categorias;
          console.log(this.categoriasArr);
        },
        (error) => {
          console.log(error);
        }
      );
    this.cargandoData = false;
  }

  editCategoria(id: number, nombre: string) {
    console.log(id)
    Swal.fire({
      title: "Ingrese nombre de categoría",
      input: "text",
      inputValue: nombre,
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
      showCancelButton: true
    })
    .then(result => {
      if(result.isConfirmed) {
        if (result.value !== nombre) {
          this.categoriasService.editCategoria(id, result.value)
            .subscribe(resp => {
              console.log(resp)
              Swal.fire('Categoría actualizada con éxito','','success')
              this.getCategorias();
            }, (error) => {
              Swal.fire('Error al actualizar categoría','','error')
              console.log(error)
            })
        }
      }
    })
  }
}
