import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Comercio, ComercioData } from 'src/app/interfaces/comercios.interface';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { FilialesService } from 'src/app/services/filiales.service';

@Component({
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})


export class ComerciosComponent {
  showComercios: boolean = false;
  cargandoData: boolean = false;
  comerciosData: ComercioData[] = [];
  filiales!: Filial[];
  comercios!: Comercio[];
  categorias!: Categoria[];
  private comerciosService = inject(ComerciosService);
  private filialesService = inject(FilialesService);

  getData() {
    this.cargandoData = true;

    forkJoin([
      this.filialesService.getFiliales(),
      this.comerciosService.getCatComercios()
    ]).subscribe(([filiales, categorias]) => {
      this.filiales = filiales;
      this.categorias = categorias;

      this.getComerciosPorFilialYCategoria();
      this.showComercios = true;
      this.cargandoData = false;
    }, error => {
      console.log(error);
      this.cargandoData = false;
    });
  }


  getComerciosPorFilialYCategoria() {
    this.cargandoData = true;
    this.filiales.forEach(filial => {
      this.categorias.forEach(category => {
        const obj = {
          filialId: filial.id,
          comercioId: category.id 
        }
        this.comerciosService.getComerciosPorCategoriaYFilial(obj)
          .subscribe( comerciosRes => {
            if (comerciosRes !== null) {
              this.comerciosData.push({
                filial,
                categoria: category,
                comercios: comerciosRes
              })
            }
          })
      })
    })

    console.log(this.comerciosData)
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
