import { Component, computed, input, Signal } from '@angular/core';
import { StatRowComponent } from "./stat-row/stat-row.component";

@Component({
  selector: 'app-stats-section',
  imports: [StatRowComponent],
  templateUrl: './stats-section.component.html',
  styleUrl: './stats-section.component.scss'
})

export class StatsSectionComponent {
  abilityScores = input<{ [key: string]: number }>();
  abilityModifiers = input<{ [key: string]: number }>();
  proficiencyBonus = input<number>()

  modifierList = this.mapEntries(this.abilityModifiers);
  scoreList = this.mapEntries(this.abilityScores);


  mapEntries(signal: Signal<{ [key: string]: number } | undefined>) {
    return computed(() => {
      const obj = signal();
      if (!obj) return [];
      return Object.entries(obj).map(([name, value]) => ({ name, value }));
    });
  }
}
