import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comercios',
  templateUrl: './dialog-comercios.component.html',
  styleUrls: ['./dialog-comercios.component.scss'],
})
export class DialogComerciosComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }


}
