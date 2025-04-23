import { Component } from '@angular/core';
import { SectionCharacterComponent } from "../../sections/section-character/section-character.component";
import { SectionCompendiumComponent } from '../../sections/section-compendium/section-copendium.component';
@Component({
  selector: 'app-dashboard',
  imports: [SectionCharacterComponent, SectionCompendiumComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
