import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pregunta } from 'src/app/interfaces/preguntas.interface';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { DialogPreguntaComponent } from '../../components/dialog-pregunta/dialog-pregunta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent {
  preguntasService = inject(PreguntasService)
  cargandoData: boolean = false;
  preguntas: any[] = [];
  displayedColumns: string[] = ['pregunta', 'respuesta', 'acciones'];
  dataSource!: MatTableDataSource<Pregunta>;
  
  @ViewChild(MatPaginator, { static: true }) paginatorCard!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPreguntas();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getPreguntas() {
    this.cargandoData = true
    this.preguntasService.getPreguntas()
      .subscribe(preguntas => {
        this.dataSource = new MatTableDataSource(preguntas);
        this.preguntas = preguntas;
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

  editPregunta(pregunta: any) {
    const dialogRef = this.dialog.open(DialogPreguntaComponent, {
      data: { pregunta }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.editarPregunta(result, pregunta.id);
      }
    });
  }

  editarPregunta(pregunta: Pregunta, id: number) {
    this.preguntasService.updatePregunta(id, pregunta)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Pregunta editada con éxito', '', 'success');
      this.getPreguntas();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al editar pregunta', '', 'error');
    })
  }

  addPregunta() {
    const dialogRef = this.dialog.open(DialogPreguntaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.agregarPregunta(result);
      }
    });
  }

  agregarPregunta(pregunta: Pregunta) {
    this.preguntasService.addPregunta(pregunta)
    .subscribe(resp => {
      console.log(resp)
      Swal.fire('Pregunta agregada con éxito', '', 'success');
      this.getPreguntas();
    }, (error) => {
      console.log(error)
      Swal.fire('Error al agregar pregunta', '', 'error');
    })
  }

  deletePregunta(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar la pregunta?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntasService.deletePregunta(id)
          .subscribe(resp => {
            Swal.fire('Pregunta eliminada con éxito', '', 'success')
            this.getPreguntas();
          }, (error) => {
            Swal.fire('Error al eliminar pregunta', '','error')
            console.log(error)
          })
      }
    });
  }

}
