import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterpretesComponent } from './interpretes.component';

const routes: Routes = [
  {path:'', component:InterpretesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterpretesRoutingModule { }
