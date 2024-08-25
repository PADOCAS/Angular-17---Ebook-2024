import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cad-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule],
  templateUrl: './cad-categoria.component.html',
  styleUrl: './cad-categoria.component.css'
})
export class CadCategoriaComponent {
// Vamos trabalhar com formulário reativo, usando FormBuilder, que agrupa um conjunto de campos de formulário,
// Ele nos ajuda com esqueleto do formulário, validações, valor padrão... muito bom!

  // categoriaForm -> é uma variável do tipo FormGroup que representa os dados que estarão
  // presentes no formulário. Cada campo no formulário é representado pela classe FormControl
  categoriaForm = this.form.group({
    id: [null],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required]]
  })

  constructor(private form: FormBuilder, private router : Router) {
  }

  onSubmit() {
    console.log('Submit', this.categoriaForm.value);
  }

  cancelar() {
    this.router.navigate(["/categorias"]);
  }
}
