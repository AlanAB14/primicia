import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { TarjetaData } from 'src/app/interfaces/tarjetaData.interface';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta',

  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss'],
})
export class TarjetaComponent implements OnInit, AfterViewInit{
  tarjetaService = inject(TarjetaService)
  cargandoData: boolean = false;
  tarjetas: TarjetaData[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'domicilio', 'ciudad', 'dni', 'ingresos', 'filial', 'mensaje', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<TarjetaData>;
  
  @ViewChild(MatPaginator, { static: true }) paginatorCard!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getSolicutudes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSolicutudes() {
    this.cargandoData = true
    this.tarjetaService.getSolicitudesTarjeta()
      .subscribe(tarjetas => {
        this.dataSource = new MatTableDataSource(tarjetas);
        this.tarjetas = tarjetas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  retornaFecha(fecha : any) {
    return moment(fecha).format('DD/MM/YYYY')
  }

  deleteSolicitud(id: number) {

  }
}
