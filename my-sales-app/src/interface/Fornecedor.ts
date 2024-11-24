import {Endereco} from "./Endereco";

export interface Fornecedor {
  id: number
  razaoSocial: string
  nomeFantasia: string
  tituloContato: string
  endereco: Endereco
}
