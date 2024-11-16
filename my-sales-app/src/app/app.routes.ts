import { Routes } from '@angular/router';
import {CategoriasComponent} from "./categorias/categorias.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CadCategoriaComponent} from "./categorias/cad-categoria/cad-categoria.component";

export const routes: Routes = [
  {
  // {path: 'categorias',component: CategoriasComponent},   // Esse modo é da forma que fica tudo junto
    path: 'categorias',
    //Dessa forma o deploy fica mais leve, náo fica tudo num unico arquivo -> Deixando o arquivo de categoria isolado, onde só será carregado se o usuário acessar a página categorias!
    loadComponent: () =>
      import('./categorias/categorias.component').then(
        (c) => c.CategoriasComponent
      )
  },
  {path: 'cad-categoria',component: CadCategoriaComponent},
  {path: 'cad-categoria-edit/:id', component: CadCategoriaComponent},
  {path: '',component: DashboardComponent}
];
