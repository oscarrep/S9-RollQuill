import { Component, computed, input } from '@angular/core';
import { SkillListComponent } from './skill-list/skill-list.component';

@Component({
  selector: 'app-skills-section',
  standalone:true,
  imports: [SkillListComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {
  abilityModifiers = input<{ [key: string]: number }>();
  skillData = input<{ name: string, desc: string, stat: string }[] | undefined>();
  proficiencyBonus = input<number>()
  proficiencies = input<string[]>()

  abilityShorts: { [key: string]: string } = {
    'STR': 'Strength',
    'DEX': 'Dexterity',
    'CON': 'Constitution',
    'INT': 'Intelligence',
    'WIS': 'Wisdom',
    'CHA': 'Charisma'
  };

  displaySkills = computed(() => {
    const skills = this.skillData();
    const mods = this.abilityModifiers();
    console.log(mods)
    if (!skills || !mods) return [];
  
    return skills.map(skill => {
      const key = this.abilityShorts[skill.stat];
      const modifier = mods[key] ?? 0;
      return { ...skill, modifier };
    });
  });

  calculateProficiency(modifier: number, pb: number) { return modifier + pb; }

}
