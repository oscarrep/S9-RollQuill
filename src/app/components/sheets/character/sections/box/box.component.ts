import { Component, input } from '@angular/core';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  title = input<string>()
  num = input<number|string>()
  score = input<number>()
  modifier = input<number>()
  large = input<boolean>()
  statBox = input<boolean>()
}
