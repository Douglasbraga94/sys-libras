import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseModule } from './../../../shared/base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionalRoutingModule } from './regional-routing.module';
import { RegionalComponent } from './regional.component';


@NgModule({
  declarations: [
    RegionalComponent
  ],
  imports: [
    BaseModule,
    RegionalRoutingModule,
    NgxSpinnerModule
  ]
})
export class RegionalModule { }
