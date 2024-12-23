import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/interfaces/categorias.interface';
import { Comercio } from 'src/app/interfaces/comercios.interface';
import { Filial } from 'src/app/interfaces/filiales.interface';
import { Promocion } from 'src/app/interfaces/promocion.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComerciosService } from 'src/app/services/comercios.service';
import { FilialesService } from 'src/app/services/filiales.service';
import { PromocionService } from 'src/app/services/promocion.service';
import { DialogComercioComponent } from '../../components/dialog-comercio/dialog-comercio.component';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { PromocionEspecialService } from 'src/app/services/promocionEspecial.service';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss'],
})
export class ComerciosComponent implements OnInit, AfterViewInit {
  cargandoData: boolean = false;
  comerciosService = inject(ComerciosService)
  categoriasService = inject(CategoriasService)
  filialService = inject(FilialesService)
  promocionService = inject(PromocionService)
  promocionEspecialService = inject(PromocionEspecialService)
  categorias!: Categoria[];
  filiales!: Filial[];
  promociones!: Promocion[];
  promocionesEspeciales!: Promocion[];
  displayedColumns: string[] = ['nombre', 'categoriaId', 'direccion', 'filialId', 'promocionId', 'promocionesEspecialesId', 'acciones'];
  dataSource!: MatTableDataSource<Comercio>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    try {
      this.cargandoData = true;

      const categorias = await lastValueFrom(this.categoriasService.getCategorias());
      this.categorias = categorias;

      const filiales = await lastValueFrom(this.filialService.getFiliales());
      this.filiales = filiales;

      const promociones = await lastValueFrom(this.promocionService.getPromociones());
      this.promociones = promociones;

      const promocionesEspeciales = await lastValueFrom(this.promocionEspecialService.getPromociones());
      this.promocionesEspeciales = promocionesEspeciales;

      const comercios = await lastValueFrom(this.comerciosService.getComercios());

      this.dataSource = new MatTableDataSource(comercios);
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Error cargando datos', error);
      Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
    } finally {
      this.cargandoData = false;
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getComercios() {
    this.cargandoData = true
    this.comerciosService.getComercios()
      .subscribe(comercios => {
        this.dataSource = new MatTableDataSource(comercios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  getCategorias() {
    this.cargandoData = true
    this.categoriasService.getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  getFiliales() {
    this.cargandoData = true
    this.filialService.getFiliales()
      .subscribe((filiales: Filial[]) => {
        this.filiales = filiales
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  getPromociones() {
    this.cargandoData = true
    this.promocionService.getPromociones()
      .subscribe((promociones: Promocion[]) => {
        this.promociones = promociones
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  getPromocionesEspeciales() {
    this.cargandoData = true
    this.promocionEspecialService.getPromociones()
      .subscribe((promociones: Promocion[]) => {
        this.promocionesEspeciales = promociones
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  addComercio() {
    const dialogRef = this.dialog.open(DialogComercioComponent, {
      data: { categorias: this.categorias, filiales: this.filiales, promociones: this.promociones, promocionesEspeciales: this.promocionesEspeciales }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.agregarComercio(result);
      }
    });
  }

  agregarComercio(comercio: Comercio) {
    this.comerciosService.addComercio(comercio)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Comercio agregado con éxito', '', 'success');
      this.getComercios();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al agregar comercio', '', 'error');
    })
  }

  editComercio(comercio: Comercio) {
    const dialogRef = this.dialog.open(DialogComercioComponent, {
      data: { categorias: this.categorias, filiales: this.filiales, promociones: this.promociones, promocionesEspeciales: this.promocionesEspeciales, comercio }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarComercio(result, comercio.id);
      }
    });
  }

  editarComercio(comercio: Comercio, id: number) {
    this.comerciosService.updateComercio(comercio, id)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Comercio editado con éxito', '', 'success');
      this.getComercios();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar comercio', '', 'error');
    })
  }

  deleteComercio(id: number) {
    console.log(id)
    Swal.fire({
      title: "¿Estás seguro de eliminar el comercio?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.comerciosService.deleteComercio(id)
          .subscribe(resp => {
            Swal.fire('Comercio eliminado con éxito', '', 'success')
            this.getComercios();
          }, (error) => {
            Swal.fire('Error al eliminar comercio', 'error')
            console.log(error)
          })
      }
    });
  }

  retornaCategoriaNombre(id: number) {
    const categoria = this.categorias.find(categoria => categoria.id === id)
    return categoria?.categoria
  }

  retornaFilialNombre(id: number) {
    const filial = this.filiales.find(filial => filial.id === id)
    return filial?.localidad
  }

  retornaPromocionNombre(promocionesId: any): string {
    const promocionesIdArray = JSON.parse(promocionesId)
    if (!promocionesIdArray) {
      return '';
    }

    const promocionesNombres = promocionesIdArray.map((id: any) => {
      const promocion = this.promociones.find((p: any) => p.id === id);
      return promocion ? promocion.promocion : '';
    });

    return promocionesNombres.filter((name: any) => name !== '').join(', ');
  }

  retornaPromocionEspecialNombre(promocionesId: any): string {
    const promocionesIdArray = JSON.parse(promocionesId)
    if (!promocionesIdArray) {
      return '';
    }

    const promocionesNombres = promocionesIdArray.map((id: any) => {
      const promocion = this.promocionesEspeciales.find((p: any) => p.id === id);
      return promocion ? promocion.promocion : '';
    });

    return promocionesNombres.filter((name: any) => name !== '').join(', ');
  }
}
