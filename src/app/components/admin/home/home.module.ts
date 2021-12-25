import { BaseModule } from './../../../shared/base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BaseModule,
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule
  ]
})
export class HomeModule { }
