import {Component} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {MenuItem} from "../../interface/MenuItem";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems: Array<MenuItem> = [
    {
      path: '/',
      label: 'Início'
    },
    {
      path: '/categorias',
      label: 'Categorias'
    },
    {
      path: '/fornecedores',
      label: 'Fornecedores'
    }
  ];
}
