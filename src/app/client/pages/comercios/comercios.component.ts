import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Comercio } from 'src/app/interfaces/comercios.interface';
import { Filial, FilialesData } from 'src/app/interfaces/filiales.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { FilialesService } from 'src/app/services/filiales.service';

@Component({
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})


export class ComerciosComponent {
  showComercios: boolean = false;
  cargandoData: boolean = false;
  filialesData: FilialesData[] = [];
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
            this.filialesData.push({
              localidad: filial.localidad,
              datos: comerciosRes
            })
          })
      })
    })

    console.log(this.filialesData)
  }



  isComInFilial(filial: Filial, comercio: Comercio) {
    if (comercio.filialId === filial.id) {
      return true;
    } else {
      return false;
    }
  }

  isCatInComercios(comercios: Comercio[], cat: Categoria) {
    const existe = comercios.find(comercio => comercio.comercioId === cat.id)
    console.log(existe)
  }

  isComInCategoria(cat: Categoria, comercio: Comercio) {
    if (comercio.comercioId === cat.id) {
      return true;
    } else {
      return false;
    }
  }

}
