import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseModule } from './../../../shared/base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterpretesRoutingModule } from './interpretes-routing.module';
import { InterpretesComponent } from './interpretes.component';


@NgModule({
  declarations: [
    InterpretesComponent
  ],
  imports: [
    BaseModule,
    InterpretesRoutingModule,
    NgxSpinnerModule
  ]
})
export class InterpretesModule { }
