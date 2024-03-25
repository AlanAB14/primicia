import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Contacto } from 'src/app/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit, AfterViewInit{
  contactoService = inject(ContactoService)
  cargandoData: boolean = false;
  contactos: Contacto[] = [];
  displayedColumns: string[] = ['motivo', 'nombre', 'dni', 'ciudad', 'filial', 'email', 'mensaje', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<Contacto>;
  
  @ViewChild(MatPaginator, { static: true }) paginatorCard!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getContactos();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getContactos() {
    this.cargandoData = true
    this.contactoService.getContactos()
      .subscribe(contactos => {
        this.dataSource = new MatTableDataSource(contactos);
        this.contactos = contactos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.log(error)
      })
    this.cargandoData = false;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  retornaFecha(fecha : any) {
    return moment(fecha).format('DD/MM/YYYY')
  }

  deleteSolicitud(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar la solicitud?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactoService.deleteContacto(id)
          .subscribe(resp => {
            Swal.fire('Solicitud eliminada con éxito', '', 'success')
            this.getContactos();
          }, (error) => {
            Swal.fire('Error al eliminar solicitud', '','error')
            console.log(error)
          })
      }
    });
  }

}
