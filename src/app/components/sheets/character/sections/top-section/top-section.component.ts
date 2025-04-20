import { Component, input } from '@angular/core';
import { BoxComponent } from "../box/box.component";

@Component({
  selector: 'app-top-section',
  imports: [BoxComponent],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.scss'
})
export class TopSectionComponent {
  armorClass = input<number>()
}
