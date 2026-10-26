import { Component } from '@angular/core';
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
  selector: 'app-loading-circular',
  templateUrl: './loading-circular.component.html',
  styleUrl: './loading-circular.component.scss',
  imports: [
    ProgressSpinner
  ],
  standalone: true
})
export class LoadingCircularComponent {

}
