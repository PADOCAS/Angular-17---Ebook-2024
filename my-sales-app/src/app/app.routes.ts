import { Routes } from '@angular/router';
import {CategoriasComponent} from "./categorias/categorias.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: '',
    component: DashboardComponent
  }
];
