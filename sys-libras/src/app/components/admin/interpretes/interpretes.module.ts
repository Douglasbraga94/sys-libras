import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterpretesRoutingModule } from './interpretes-routing.module';
import { InterpretesComponent } from './interpretes.component';


@NgModule({
  declarations: [
    InterpretesComponent
  ],
  imports: [
    CommonModule,
    InterpretesRoutingModule
  ]
})
export class InterpretesModule { }
