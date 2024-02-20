import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Comercio, ComercioData } from 'src/app/interfaces/comercios.interface';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { FilialesService } from 'src/app/services/filiales.service';
import { DialogComerciosComponent } from '../../components/dialog-comercios/dialog-comercios.component';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})


export class ComerciosComponent {
  showComercios: boolean = false;
  cargandoData: boolean = false;
  cargandoDataFilial: boolean = false;
  filialIdSeleccionada!: number;
  buscadoPorSearch: boolean = false;
  comerciosData: ComercioData[] = [];
  comerciosDataSearch: ComercioData[] = [];
  comerciosPorSearch = [];
  filiales!: any[];
  filialesEncontradas!: Filial[];
  comercios!: Comercio[];
  promociones!: Promocion[];
  categorias!: any[];
  formSearch: FormGroup = this.fb.group({
    localidad: [''],
    categoria: [''],
    promocion: ['']
  })
  private comerciosService = inject(ComerciosService);
  private categoriasService = inject(CategoriasService);
  private filialesService = inject(FilialesService);
  private promocionService = inject(PromocionService);


  constructor(public dialog: MatDialog,
    public fb: FormBuilder) { }

  getData() {
    this.comerciosPorSearch = [];
    this.buscadoPorSearch = false;

    this.getFiliales();
    this.getCategorias();
    this.getPromociones();
  }

  getFiliales() {
    this.cargandoData = true;
    this.filialesService.getFiliales()
      .subscribe((filiales) => {
        this.filiales = filiales.map(filial => ({ ...filial, comerciosVisible: false }));
        this.cargandoData = false;
        this.showComercios = true;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getCategorias() {
    this.cargandoData = true;
    this.categoriasService.getCategorias()
      .subscribe(categorias => {
        this.categorias = categorias;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getPromociones() {
    this.cargandoData = true;
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        this.promociones = promociones;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }


  buscarComerciosDeFilial(filialId: number) {
    this.cargandoDataFilial = true;
    this.filiales = this.filiales.map(filial => {
      if (filial.id === filialId) {
        return { ...filial, comerciosVisible: !filial.comerciosVisible };
      } else {
        return filial;
      }
    });
    this.filialIdSeleccionada = filialId;
    this.comerciosService.getComerciosPorFilial(filialId)
      .subscribe(comercios => {
        console.log(comercios)
        this.filiales = this.filiales.map(filial => {
          if (filial.id === filialId) {
            return { ...filial, comerciosDeFilial: comercios };
          } else {
            return filial;
          }
        });
        this.cargandoDataFilial = false;
      }, (error) => {
        console.log(error);
        this.cargandoDataFilial = false;
      })
  }

  retornaArrayCategorias(comercios: any) {
    let categoriasSet = new Set<string>();
    comercios.forEach((comercio: any) => {
      categoriasSet.add(comercio.categoria)
    })
    let categorias = Array.from(categoriasSet).sort();
    return categorias;
  }

  retornaArrayCategoriasTraidas(comercios: any) {
    let categoriasSet = new Set<string>();
    comercios.forEach((comercio: any) => {
      categoriasSet.add(this.categorias.find(categoria => categoria.id === comercio.categoriaId))
    })
    let categorias: any = Array.from(categoriasSet).sort();
    return categorias;
  }

  retornaArrayFiliales(comercios: any) {
    let filialesSet = new Set<string>();
    comercios.forEach((comercio: any) => {
      filialesSet.add(this.filiales.find(filial => filial.id === comercio.filialId))
    })
    let filiales: any = Array.from(filialesSet).sort();
    return filiales;
  }

  getComerciosDeCategoria(comercios: any, categoria: any) {
    let comerciosDeCategoria: any[] = [];
    comercios.forEach((comercio: any) => {
      if (comercio.categoria === categoria) {
        comerciosDeCategoria.push(comercio)
      }
    })
    return comerciosDeCategoria;
  }

  getComerciosDeCategoriaTraidaPorFilial(comercios: any, categoria: any, filial: any) {
    let comerciosDeCategoria: any[] = [];
    comercios.forEach((comercio: any) => {
      if (comercio.categoriaId === categoria.id && comercio.filialId === filial.id) {
        comerciosDeCategoria.push(comercio)
      }
    })
    return comerciosDeCategoria;
  }


  buscarPorFiltro() {
    this.comerciosPorSearch = [];
    if (this.formSearch.value.localidad === '' && (this.formSearch.value.categoria === '' || this.formSearch.value.categoria === 'Todas') && (this.formSearch.value.promocion === '' || this.formSearch.value.promocion === 'Todas')) {
      console.log('No se ingreso dato')
      this.buscadoPorSearch = false;
      this.filiales = this.filiales.map(filial => {
        return { ...filial, comerciosVisible: false };
      });

      return
    }

    let obj = {
      localidad: '',
      categoria: '',
      promocion: ''
    };

    obj.localidad = this.setIdLocalidad()
    obj.categoria = this.formSearch.value.categoria;
    obj.promocion = this.formSearch.value.promocion;

    this.cargandoData = true;
    this.comerciosService.getComerciosPorFilialCategoriaPromocion(obj)
      .subscribe((comercios: any) => {
        console.log(comercios)
        this.comerciosPorSearch = comercios;
        this.buscadoPorSearch = true;
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.buscadoPorSearch = false;
        this.cargandoData = false;
      })

  }

  setIdLocalidad() {
    let arrayLocalidades: any = [];
    this.filiales.forEach(filial => {
      if (filial.localidad.toLowerCase().includes(this.formSearch.value.localidad.trim().toLowerCase())) {
        arrayLocalidades.push(filial.id)
      }
    })
    return arrayLocalidades;
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
