import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {CategoriasItem} from './categorias-datasource';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Categoria} from "../../interface/Categoria";
import {CategoriasService} from "./categorias.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButton]
})
export class CategoriasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>;
  dataSource = new MatTableDataSource<Categoria>();


  constructor(private categoriaService: CategoriasService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'descricao'];

  ngAfterViewInit(): void {
    this.loadCategorias();
  }

  async loadCategorias(): Promise<void> {
    let categories = await lastValueFrom(this.categoriaService.getCategorias());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
