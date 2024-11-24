import { Component } from '@angular/core';
import {MaterialModule} from "../material.module";
import {LoadingBarComponent} from "../util/loading-bar/loading-bar.component";

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [MaterialModule, LoadingBarComponent],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.css'
})
export class FornecedoresComponent {
  showLoading: Boolean = false;
}
