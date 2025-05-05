import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillCheckboxComponent } from '../../../../shared/skill-checkbox/skill-checkbox.component';

@Component({
  selector: 'app-class-form',
  imports: [CommonModule, ReactiveFormsModule, SkillCheckboxComponent],
  standalone:true,
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss'
})
export class ClassFormComponent {
  @Input() form!: FormGroup;
  @Input() submitted: boolean = false;
  @Input() classNames: string[] = [];
  @Input() classData: any[] = []
  @Input() selectedClass!: any;
  @Input() subclasses: string[] = [];
  @Input() skills: string[] = [];
  @Input() isInvalid!: (controlName: string) => boolean;
  @Output() selectedClassChange = new EventEmitter<any>();

  private classSubscription: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] && this.form) {
      if (this.classSubscription) this.classSubscription.unsubscribe();

      this.form.get('class')?.valueChanges.subscribe(className => {
        const selected = this.classData.find(cls => cls.name === className);
        this.subclasses = selected?.subclasses?.map((scls: any) => scls.name) || [];
        this.form.patchValue({ subclass: '' });

        const skillChoices = selected?.proficiency_choices?.[0]?.skills || [];
        this.skills = skillChoices;
        console.log(this.skills)
        this.form.patchValue({ classSkills: [] });
        this.selectedClass = selected;

        this.form.patchValue({ savingThrows: (selected?.saving_throws ?? []).map((st: any) => st.name) });
      });
    }
  }


  toggleClassSkill(skill: string, check: boolean) {
    const currentSkills = this.form.value.classSkills as string[];
    const maxSkills = this.selectedClass?.skillChoose || 0;

    if (check && currentSkills.length < maxSkills) this.form.patchValue({ classSkills: [...currentSkills, skill] });
    else if (!check) this.form.patchValue({ classSkills: currentSkills.filter(s => s !== skill) });

  }

  isClassSkillChecked(skill: string): boolean {
    return this.form.value.classSkills.includes(skill);
  }

  isClassSkillDisabled(skill: string): boolean {
    const cs = this.form.value.classSkills;
    return (
      (!cs.includes(skill) && cs.length >= (this.selectedClass?.skillChoose || 0)) ||
      this.form.value.backgroundSkills.includes(skill)
    );
  }
}
