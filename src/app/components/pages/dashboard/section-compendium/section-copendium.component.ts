import { Component } from '@angular/core';
import { CardCompendiumComponent } from '../../../widgets/card-compendium/card-compendium.component';

@Component({
  selector: 'app-section-compendium',
  imports: [CardCompendiumComponent],
  standalone: true,
  templateUrl: './section-compendium.component.html',
  styleUrl: './section-compendium.component.scss'
})
export class SectionCompendiumComponent {
  compendiumNames = ['Races', 'Classes', 'Features', 'Spells', 'Items'];
}
