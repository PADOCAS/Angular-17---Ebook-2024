import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Categoria} from "../../interface/Categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {
  }

  public getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.api + "categorias");
  }

  public salvar(categoria: Categoria): Observable<Categoria> {
    if (categoria.id !== null
      && categoria.id !== 0) {
      //Caso for alteração de uma categoria:
      return this.http.put<Categoria>(environment.api + 'categorias/' + categoria.id, categoria);
    } else {
      //Insert de nova categoria:
      return this.http.post<Categoria>(environment.api + 'categorias', categoria);
    }
  }
}
