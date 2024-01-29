import { Component, Input } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Comercio, ComercioData } from 'src/app/interfaces/comercios.interface';
import { Filial } from 'src/app/interfaces/filiales.interface';

@Component({
  selector: 'app-comercios-show',
  templateUrl: './comercios-show.component.html',
  styleUrls: ['./comercios-show.component.scss'],
})
export class ComerciosShowComponent {
  @Input() filiales!: Filial[];
  @Input() categorias!: Categoria[];
  @Input() comercios!: Comercio[];
  @Input() comerciosData!: ComercioData[];
  @Input() promocionValida!: any;


  getCategoriasDeFilial(filial: Filial) {
    const data: any = this.comerciosData.filter(dato => {
      if (dato.filial.id === filial.id) {
        return dato.categoria
      }else {
        return
      }
    })
    return data
  }

  filialTieneComercios(filial: Filial) {
    const comerciosFiltrados = this.comerciosData.filter((comercios) => {
      return filial.id === comercios.filial.id
    })
    if (comerciosFiltrados.length > 0) {
      return true
    }else {
      return false
    }
  }

  getComerciosDeCategoria(filial: Filial, categoria: Categoria): any[] {
    // Utiliza la función filter y devuelve los elementos que cumplen con las condiciones
    const comerciosFiltrados = this.comerciosData.filter((comercios) => {
      return comercios.filial.id === filial.id &&
             comercios.categoria.id === categoria.id &&
             comercios.comercios !== null;
    });
    // Devuelve el array resultante
    return comerciosFiltrados || [];
  }
}
