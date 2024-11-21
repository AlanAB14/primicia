import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comercio, ComercioData } from 'src/app/interfaces/comercios.interface';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { FilialesService } from 'src/app/services/filiales.service';
import { DialogComerciosComponent } from '../../components/dialog-comercios/dialog-comercios.component';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, lastValueFrom, tap } from 'rxjs';
import { PromocionEspecialService } from 'src/app/services/promocionEspecial.service';
import { HabilitarFuncionService } from 'src/app/services/habilitarFuncion.service';

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
  fromPromociones: boolean = false;
  showPromocionesEspeciales!: boolean;
  comerciosData: ComercioData[] = [];
  comerciosDataSearch: ComercioData[] = [];
  comerciosPorSearch = [];
  filiales!: any[];
  filialesEncontradas!: Filial[];
  comercios!: Comercio[];
  promociones: Promocion[] = [];
  promocionesEspeciales: Promocion[] = [];
  categorias!: any[];
  formSearch: FormGroup = this.fb.group({
    localidad: [''],
    categoria: [''],
    promocion: [''],
    promocionEspecial: ['']
  })
  private comerciosService = inject(ComerciosService);
  private categoriasService = inject(CategoriasService);
  private filialesService = inject(FilialesService);
  private promocionService = inject(PromocionService);
  private promocionEspecialService = inject(PromocionEspecialService);
  private habilitarFuncionService = inject(HabilitarFuncionService);


  constructor(public dialog: MatDialog,
    public fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.habilitarFuncionService.funciones) {
      const funcionPromociones = this.habilitarFuncionService.funciones.find(funcion => funcion.nombre === 'promociones_especiales')
      if (funcionPromociones?.activated) {
        this.showPromocionesEspeciales = true;
      }
    }

    try {
      const paramC = this.route.snapshot.paramMap.get('c');
      if (paramC) {
        const data = atob(paramC);
        const dataJson = JSON.parse(data);
        if (dataJson) {
          this.fromPromociones = true;
          this.setValores().subscribe(() => {
            this.formSearch.patchValue({
              promocion: dataJson
            });
            this.buscarPorFiltro();
          });
        }
      }

      const paramCE = this.route.snapshot.paramMap.get('ce');
      if (paramCE) {
        const data = atob(paramCE);
        const dataJson = JSON.parse(data);
        if (dataJson) {
          this.fromPromociones = true;
          this.setValores().subscribe(() => {
            this.formSearch.patchValue({
              promocionEspecial: dataJson
            });
            this.buscarPorFiltro();
          });
        }
      }
    } catch (error) {
      console.error('Error al procesar los parámetros:', error);
    }
  }


  setValores() {
    return forkJoin({
      filiales: this.getFilialesServicio(),
      categorias: this.getCategoriasServicio(),
      promociones: this.getPromocionesServicio(),
      promocionesEspeciales: this.getPromocionesEspecialesServicio()
    });
  }

  getData() {
    this.comerciosPorSearch = [];
    this.buscadoPorSearch = false;

    this.getFiliales();
    this.getCategorias();
    this.getPromociones();
    this.getPromocionesEspeciales();
  }


  getFilialesServicio() {
    return this.filialesService.getFiliales()
      .pipe(
        tap(filiales => {
          this.filiales = filiales.map(filial => ({ ...filial, comerciosVisible: false }));
          this.showComercios = true;
        }),
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }

  getCategoriasServicio() {
    return this.categoriasService.getCategorias()
      .pipe(
        tap(categorias => this.categorias = categorias),
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }

  getPromocionesServicio() {
    return this.promocionService.getPromociones()
      .pipe(
        tap(promociones => this.seteoPromociones(promociones)),
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }

  getPromocionesEspecialesServicio() {
    return this.promocionEspecialService.getPromociones()
      .pipe(
        tap(promociones => this.seteoPromocionesEspeciales(promociones)),
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }

  seteoPromociones(promociones: any) {
    promociones.forEach((promocion: any) => {
      if (promocion.tieneContador) {
        this.promociones.push(promocion)
      }
    });
  }

  seteoPromocionesEspeciales(promociones: any) {
    promociones.forEach((promocion: any) => {
      if (promocion.tieneContador) {
        this.promocionesEspeciales.push(promocion)
      }
    });
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
        this.seteoPromociones(promociones)
        this.cargandoData = false;
      }, (error) => {
        console.log(error);
        this.cargandoData = false;
      })
  }

  getPromocionesEspeciales() {
    this.cargandoData = true;
    this.promocionEspecialService.getPromociones()
      .subscribe(promociones => {
        this.seteoPromocionesEspeciales(promociones)
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
    categorias.sort((a: any, b: any) => {
      if (a.categoria < b.categoria) {
        return -1;
      }
      if (a.categoria > b.categoria) {
        return 1;
      }
      return 0;
    })
    return categorias;
  }

  retornaArrayFiliales(comercios: any) {
    let filialesSet = new Set<string>();
    comercios.forEach((comercio: any) => {
      filialesSet.add(this.filiales.find(filial => filial.id === comercio.filialId))
    })
    let filiales: any = Array.from(filialesSet).sort();
    filiales.sort((a: any, b: any) => {
      if (a.localidad < b.localidad) {
        return -1;
      }
      if (a.localidad > b.localidad) {
        return 1;
      }
      return 0;
    })
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
    if (this.formSearch.value.localidad === '' && (this.formSearch.value.categoria === '' || this.formSearch.value.categoria === 'Todas') && (this.formSearch.value.promocion === '' || this.formSearch.value.promocion === 'Todas') && (this.formSearch.value.promocionEspecial === '' || this.formSearch.value.promocionEspecial === 'Todas')) {
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
      promocion: '',
      promocionEspecial: ''
    };

    obj.localidad = this.setIdLocalidad()
    obj.categoria = this.formSearch.value.categoria;
    obj.promocion = this.formSearch.value.promocion;
    obj.promocionEspecial = this.formSearch.value.promocionEspecial;

    if (obj.localidad.length === 0) {
      this.buscadoPorSearch = true;
      this.comerciosPorSearch = [];
      return
    }


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
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const localidadSinAcentos = removeAccents(this.formSearch.value.localidad.trim().toLowerCase());

    this.filiales.forEach(filial => {
      const filialSinAcentos = removeAccents(filial.localidad.toLowerCase());
      if (filialSinAcentos.includes(localidadSinAcentos)) {
        arrayLocalidades.push(filial.id);
      }
    });

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
