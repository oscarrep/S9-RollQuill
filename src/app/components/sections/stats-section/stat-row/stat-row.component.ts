import { Component, input } from '@angular/core';
import { BoxComponent } from '../../../../shared/box/box.component';

@Component({
  selector: 'app-stat-row',
  imports: [BoxComponent],
  templateUrl: './stat-row.component.html',
  styleUrl: './stat-row.component.scss'
})
export class StatRowComponent {
  abilityScores = input<{ name: string; value: number }[]>();
  abilityModifiers = input<{ name: string; value: number }[]>();
  savingThrows = input<string>()
  proficiencyBonus = input<number>()

  getScoreFor(name: string): number | undefined {
    return this.abilityScores()!.find(score => score.name === name)?.value;
  }

  getShortName(fullName: string): string {
    const map: { [key: string]: string } = {
      Strength: 'STR',
      Dexterity: 'DEX',
      Constitution: 'CON',
      Intelligence: 'INT',
      Wisdom: 'WIS',
      Charisma: 'CHA'
    };
    return map[fullName] || '';
  }

  /*getSavingThrowModifier(modName: string, modValue: number): number {
    const savingThrows = this.savingThrows();
    const profBonus = this.proficiencyBonus();
  
    if (!savingThrows || !profBonus) {
      throw new Error('Required data not available yet');
    }
  
    const short = this.getShortName(modName);
    const isProficient = savingThrows.includes(short);
  
    return isProficient ? modValue + profBonus : modValue;
  }

  get isReady(): boolean {
    return !!this.savingThrows() && !!this.proficiencyBonus() && !!this.abilityModifiers();
  }*/
}
