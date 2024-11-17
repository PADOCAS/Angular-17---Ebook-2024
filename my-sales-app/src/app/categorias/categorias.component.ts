import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {CategoriasItem} from './categorias-datasource';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Categoria} from "../../interface/Categoria";
import {CategoriasService} from "./categorias.service";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoadingBarComponent} from "../util/loading-bar/loading-bar.component";
import * as console from "node:console";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButton, MatIconModule, MatTooltipModule, LoadingBarComponent]
})
export class CategoriasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>;
  dataSource = new MatTableDataSource<Categoria>();
  showLoading: Boolean = false


  constructor(private categoriaService: CategoriasService, private router: Router) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'descricao', 'editar', 'excluir'];

  ngAfterViewInit(): void {
    this.loadCategorias();
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  async loadCategorias(): Promise<void> {
    //Chamada assincrona, para alimentar  o data source ele aguarda a resposta do service com as categorias:
    this.showLoading = true;
    let categories = await lastValueFrom(this.categoriaService.getCategorias());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  navegarParaCadCategoria() {
    this.router.navigate(['/cad-categoria']);  // Navegue para a rota desejada
  }

  onClickEditar(categoria: Categoria) {
    console.log('Editando Categoria: ', categoria);

    if (categoria !== undefined
      && categoria !== null
      && categoria.id !== undefined
      && categoria.id !== null) {
      this.router.navigate(['/cad-categoria-edit', categoria.id]);
    }
  }

  async onClickDeletar(categoria: Categoria) {
    console.log('Excluindo Categoria: ', categoria);

    if (categoria !== undefined
      && categoria !== null
      && categoria.id !== undefined
      && categoria.id !== null) {
      if (confirm(`Deletar Categoria (${categoria.id}) ${categoria.nome} ?`)) {
        this.showLoading = true;
        this.categoriaService.deletar(categoria.id).subscribe(
          data => {
            this.showLoading = false;
            //Carregar Categorias após deletar:
            this.loadCategorias();
          }
        );
      }
    }
  }
}
