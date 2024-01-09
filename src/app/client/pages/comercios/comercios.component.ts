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
  filialSearch: string = '';
  categoriaSearch: string = '';
  promocionSearch: string = '';
  comerciosData: ComercioData[] = [];
  comerciosDataSearch : ComercioData[] = [];
  filiales!: Filial[];
  filialesEncontradas!: Filial[];
  comercios!: Comercio[];
  categorias!: Categoria[];
  private comerciosService = inject(ComerciosService);
  private filialesService = inject(FilialesService);

  leerMasBeneficios: boolean = false;
  leerMasAdhiero: boolean = false;
  leerMasInstrucciones: boolean = false;

  getData() {
    this.cargandoData = true;

    forkJoin([
      this.filialesService.getFiliales(),
      this.comerciosService.getCatComercios()
    ]).subscribe(([filiales, categorias]) => {
      this.filiales = filiales;
      this.categorias = categorias;
      console.log(filiales, categorias)

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
          categoriaId: category.id 
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
    this.comerciosDataSearch = this.comerciosData
  }

  buscarPorFiltro() {
    this.cargandoData = true
    if (this.filialSearch === '' && (this.categoriaSearch === '' || this.categoriaSearch === 'Todas') && ( this.promocionSearch === '' || this.promocionSearch === 'Todas')) {
      this.comerciosDataSearch = this.comerciosData
      setTimeout(() => {
        this.cargandoData = false;
      }, 300);
      return
    }

    if ((this.categoriaSearch === '' || this.categoriaSearch === 'Todas')) {
      setTimeout(() => {
        this.cargandoData = false;
      }, 300);
      const comerciosDeCategoria = this.comerciosData.filter(comercio => comercio.filial.localidad.toLocaleLowerCase().includes(this.filialSearch))
      this.comerciosDataSearch = comerciosDeCategoria;
      return
    }

    if (this.filialSearch === '') {
      setTimeout(() => {
        this.cargandoData = false;
      }, 300);
      const comerciosDeCategoria = this.comerciosData.filter(comercio => comercio.categoria.id === Number(this.categoriaSearch))
      this.comerciosDataSearch = comerciosDeCategoria;
      return
    }

    setTimeout(() => {
      this.cargandoData = false;
    }, 300);
    const comerciosDeCategoria = this.comerciosData.filter(comercio => comercio.categoria.id === Number(this.categoriaSearch) && comercio.filial.localidad.toLocaleLowerCase().includes(this.filialSearch))
    this.comerciosDataSearch = comerciosDeCategoria;
  }

}
