import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../../../interface/Categoria";
import {CategoriasService} from "../categorias.service";
import {lastValueFrom} from "rxjs";
import {NgIf} from "@angular/common";
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-cad-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, NgIf, MatGridList],
  templateUrl: './cad-categoria.component.html',
  styleUrl: './cad-categoria.component.css'
})
export class CadCategoriaComponent implements OnInit {
// Vamos trabalhar com formulário reativo, usando FormBuilder, que agrupa um conjunto de campos de formulário,
// Ele nos ajuda com esqueleto do formulário, validações, valor padrão... muito bom!

  // categoriaForm -> é uma variável do tipo FormGroup que representa os dados que estarão
  // presentes no formulário. Cada campo no formulário é representado pela classe FormControl
  categoriaForm = this.form.group({
    id: [null as number | null],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required]]
  })

  constructor(private categoriaService: CategoriasService, private form: FormBuilder, private router: Router, private routeActive: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.routeActive !== undefined
      && this.routeActive !== null
      && this.routeActive.snapshot !== undefined
      && this.routeActive.snapshot !== null
      && this.routeActive.snapshot.paramMap !== undefined
      && this.routeActive.snapshot.paramMap !== null
      && this.routeActive.snapshot.paramMap.get('id') !== undefined
      && this.routeActive.snapshot.paramMap.get('id') !== null) {
      this.categoriaService.pegar(Number(this.routeActive.snapshot.paramMap.get('id'))).subscribe(
        data => {
          if (data !== undefined
            && data !== null) {
            let cat = data as Categoria;

            this.categoriaForm.setValue({
              id: cat.id,
              nome: cat.nome,
              descricao: cat.descricao
            });

            //Desabilita o ID quando é consulta, apenas mostra
            this.categoriaForm.get('id')?.disable();
          }
        }
      );
    }
  }

  onSubmit() {
    console.log('Submit', this.categoriaForm.value);
    this.onSave(this.convertFormBuilderGroupToCategoria());
  }

  //Converte o formBuilderGroup com seu value para o objeto categoria:
  private convertFormBuilderGroupToCategoria(): Categoria {
    // Habilita o campo 'id' antes de capturar os valores (Usamos o optional chaining ? para validar se ta nulo ou undefined ele ignorar (casos de inclusào))
    this.categoriaForm.get('id')?.enable();

    let value = this.categoriaForm.value;

    // Desahabilita o campo 'id' depois que completou o salvar (Usamos o optional chaining ? para validar se ta nulo ou undefined ele ignorar (casos de inclusào))
    this.categoriaForm.get('id')?.disable();

    return {
      id: value.id ?? 0,
      nome: value.nome || '',
      descricao: value.descricao || ''
    };
  }

  async onSave(categoria: Categoria) {
    //Async/Await -> Esperando a resposta do salvar para ai sim redirecionar a página, já com a alteração sendo carregada lá na listagem!
    let saved = await lastValueFrom(this.categoriaService.salvar(categoria));
    console.log('Categoria salva: ', saved);
    //Ao salvar redireciona para a listagem:
    this.router.navigate(["/categorias"]);
  }

  cancelar() {
    this.router.navigate(["/categorias"]);
  }
}
