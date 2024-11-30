import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Fornecedor} from "../../interface/Fornecedor";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  constructor(private http: HttpClient) {
  }

  public getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(environment.api + "fornecedores");
  }

  public salvar(fornecedor: Fornecedor): Observable<Fornecedor> {
    if (fornecedor.id !== null
      && fornecedor.id !== 0) {
      //Caso for alteração de um Fornecedor:
      return this.http.put<Fornecedor>(environment.api + 'fornecedores/' + fornecedor.id, fornecedor);
    } else {
      //Insert de novo Fornecedor:
      return this.http.post<Fornecedor>(environment.api + 'fornecedores', fornecedor);
    }
  }

  public pegar(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(environment.api + 'fornecedores/' + id);
  }

  public deletar(id: number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(environment.api + 'fornecedores/' + id);
  }
}
