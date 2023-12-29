import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{

  cargandoData: boolean = true;

  ngOnInit() {
    this.cargandoData = false;
  }

  onActivate(event: any) {

  }

}
