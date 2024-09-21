import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent {
  @Input() visible: Boolean = true;
}
