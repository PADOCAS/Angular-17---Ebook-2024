import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {MaterialModule} from "./material.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MaterialModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
