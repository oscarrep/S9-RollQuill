import { Component, input } from '@angular/core';
import { ButtonComponent } from "../../../../button/button.component";

@Component({
  selector: 'app-name-section',
  imports: [ButtonComponent],
  templateUrl: './name-section.component.html',
  styleUrl: './name-section.component.scss'
})
export class NameSectionComponent {

  charName = input<string>()
  charRace = input<string>()
  charSubRace = input<string>()
  charClass = input<string>()
  charSubclass = input<string>()
  charLevel = input<number>()
}
