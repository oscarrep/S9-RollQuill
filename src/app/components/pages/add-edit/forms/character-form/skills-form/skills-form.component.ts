import { Component, Input } from '@angular/core';
import { SkillCheckboxComponent } from '../../../../../../shared/skill-checkbox/skill-checkbox.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../../../../../../shared/tooltip/tooltip.component';

@Component({
  selector: 'app-skills-form',
  imports: [SkillCheckboxComponent, CommonModule, ReactiveFormsModule, TooltipComponent],
  standalone: true,
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss'
})
export class SkillsFormComponent {
  @Input() skillData: any[] = [];
  @Input() form!: FormGroup;
  @Input() isInvalid!: (controlName: string) => boolean;

  tooltipText: string = '';
  pressTimeout: any;

  startPress(skillDesc: string, tooltip: any) {
    this.tooltipText = skillDesc;
    this.pressTimeout = setTimeout(() => {
      tooltip.disabled = false;
      tooltip.show();
    }, 400);
  }

  cancelPress(tooltip: any) {
    clearTimeout(this.pressTimeout);
    tooltip.hide();
    tooltip.disabled = true;
  }

  toggleBackgroundSkill(skill: string, check: boolean) {
    const currentSkills = this.form.value.backgroundSkills as string[];
    if (check && currentSkills.length < 2) {
      this.form.patchValue({ backgroundSkills: [...currentSkills, skill] });
    } else if (!check) {
      this.form.patchValue({ backgroundSkills: currentSkills.filter(s => s !== skill) });
    }
  }

  isBackgroundSkillChecked(skill: string): boolean {
    return this.form.value.backgroundSkills.includes(skill);
  }
}