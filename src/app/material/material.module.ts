import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  exports: [
    MatRadioModule,
    MatIconModule
  ]
})
export class MaterialModule { }
