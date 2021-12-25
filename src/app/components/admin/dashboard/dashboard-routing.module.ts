import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module')
          .then((m) => m.HomeModule)
      },
      {
        path: 'interpretes',
        loadChildren: () => import('../interpretes/interpretes.module')
          .then((m) => m.InterpretesModule)
      },
      {
        path: 'regional',
        loadChildren: () => import('../regional/regional.module')
          .then((m) => m.RegionalModule)
      }

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
