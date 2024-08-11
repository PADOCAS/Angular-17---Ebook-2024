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

  public getCategorias():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.api + "categories");
  }
}
