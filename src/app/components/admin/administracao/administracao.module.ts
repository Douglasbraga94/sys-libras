import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracaoRoutingModule } from './administracao-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministracaoRoutingModule,
    NgxSpinnerModule
  ]
})
export class AdministracaoModule { }
