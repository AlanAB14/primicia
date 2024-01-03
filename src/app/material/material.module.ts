import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  exports: [
    MatRadioModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
