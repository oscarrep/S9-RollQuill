import { Component, computed, Input } from '@angular/core';
import { TooltipComponent } from '../../../../../shared/tooltip/tooltip.component';

@Component({
  selector: 'app-skill-list',
  imports: [TooltipComponent],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
    @Input() skills: { name: string; desc: string; stat: string }[] = [];
    @Input() proficiencies: string[] = [];
    @Input() abilityModifiers: { [key: string]: number } = {};
    @Input() proficiencyBonus: number = 0;
  
    abilityShorts: { [key: string]: string } = {
      'STR': 'Strength',
      'DEX': 'Dexterity',
      'CON': 'Constitution',
      'INT': 'Intelligence',
      'WIS': 'Wisdom',
      'CHA': 'Charisma'
    };
  
    skillDisplay = computed(() => {
      return this.skills.map(skill => {
        const key = this.abilityShorts[skill.stat];
        const modifier = this.abilityModifiers[key] ?? 0;
        return { ...skill, modifier };
      });
    });
  
    calculateProficiency(modifier: number): number {
      return modifier + this.proficiencyBonus;
    }
  
    isProficient(skill: string): boolean {
      return this.proficiencies.includes(skill);
    }
  }

