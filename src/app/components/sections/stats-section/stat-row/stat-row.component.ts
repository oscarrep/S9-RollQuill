import { Component, input } from '@angular/core';
import { BoxComponent } from '../../../../shared/box/box.component';
import { REVERSE_STAT_NAME_MAP } from '../../../../shared/stat-map';

@Component({
  selector: 'app-stat-row',
  imports: [BoxComponent],
  standalone:true,
  templateUrl: './stat-row.component.html',
  styleUrl: './stat-row.component.scss'
})
export class StatRowComponent {
  abilityScores = input<{ name: string; value: number }[]>();
  abilityModifiers = input<{ name: string; value: number }[]>();
  proficiencies = input<string[]>()
  savingThrows = input<string>()
  proficiencyBonus = input<number>()

  getScoreFor(name: string): number | undefined {
    return this.abilityScores()!.find(score => score.name === name)?.value;
  }

  getShortName(fullName: string): string {
    return REVERSE_STAT_NAME_MAP[fullName] || '';
  }

  checkProficiency(proficiencies: string[], ability: string): boolean {
    const shortAbility = this.getShortName(ability);
    return proficiencies.includes(shortAbility)
  }
}