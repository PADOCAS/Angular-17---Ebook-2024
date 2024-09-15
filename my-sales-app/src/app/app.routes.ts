import { Routes } from '@angular/router';
import {CategoriasComponent} from "./categorias/categorias.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CadCategoriaComponent} from "./categorias/cad-categoria/cad-categoria.component";

export const routes: Routes = [
  {path: 'categorias',component: CategoriasComponent},
  {path: 'cad-categoria',component: CadCategoriaComponent},
  {path: 'cad-categoria-edit/:id', component: CadCategoriaComponent},
  {path: '',component: DashboardComponent}
];
