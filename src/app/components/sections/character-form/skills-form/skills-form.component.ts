import { Component, Input } from '@angular/core';
import { SkillCheckboxComponent } from '../../../../shared/skill-checkbox/skill-checkbox.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-form',
  imports: [SkillCheckboxComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss'
})
export class SkillsFormComponent {
  @Input() skillData: any[] = [];
  @Input() form!: FormGroup;
  @Input() isInvalid!: (controlName: string) => boolean;


  toggleBackgroundSkill(skill: string, check: boolean) {
    const currentSkills = this.form.value.backgroundSkills as string[];

    if (check && currentSkills.length < 2) this.form.patchValue({ backgroundSkills: [...currentSkills, skill] });
    else if (!check) this.form.patchValue({ backgroundSkills: currentSkills.filter(s => s !== skill) });

  }

  isBackgroundSkillChecked(skill: string): boolean {
    return this.form.value.backgroundSkills.includes(skill);
  }

  isBackgroundSkillDisabled(skill: string): boolean {
    const bs = this.form.value.backgroundSkills;
    return (
      (!bs.includes(skill) && bs.length >= 2) ||
      this.form.value.classSkills.includes(skill)
    );
  }
}
