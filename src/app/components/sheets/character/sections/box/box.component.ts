import { Component, input } from '@angular/core';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  title = input<string>()
  stat = input<number>()
  large = input<boolean>()
}
