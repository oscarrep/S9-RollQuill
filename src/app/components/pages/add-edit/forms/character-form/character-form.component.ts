import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../../../../interfaces/character';
import { DndApiService } from '../../../../../services/dnd-api.service';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { NavigateService } from '../../../../../services/navigate.service';
import { SkillCheckboxComponent } from '../../../../../shared/skill-checkbox/skill-checkbox.component';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, SkillCheckboxComponent]
})
export class CharacterFormComponent {
  @Input() character: Character | null = null;
  form = inject(FormBuilder)
  _dndService = inject(DndApiService)
  _navigationService = inject(NavigateService)
  characterForm: FormGroup;

  standardArray: number[] = [8, 10, 12, 13, 14, 15];
  statNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  selectedStatValues: { [key: string]: number | null } = {};

  classData: any[] = []
  raceData: any[] = []
  skillData: any[] = []

  backgroundSkillsSelected = 0;
  classSkillsSelected = 0;

  selectedClass: any;
  selectedRace: any;
  classNames: string[] = [];
  subclasses: string[] = [];
  raceNames: string[] = [];
  subraces: string[] = [];
  skills: string[] = [];

  constructor() {
    this.characterForm = this.form.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      STR: ['', Validators.required],
      DEX: ['', Validators.required],
      CON: ['', Validators.required],
      INT: ['', Validators.required],
      WIS: ['', Validators.required],
      CHA: ['', Validators.required],
      subrace: ['', Validators.required],
      class: ['', Validators.required],
      subclass: ['', Validators.required],
      classSkills: [[], Validators.required],
      backgroundSkills: [[], Validators.required],
      expertise: [''],
      level: [1],
      speed: 0,
      savingThrows: [[]],
    })
  }

  ngOnInit() {
    this.getFromJson('classes');
    this.getFromJson('races');
    this.getFromJson('skills');
    this.statValueListeners();

    this.characterForm.get('class')?.valueChanges.subscribe(className => {
      const selected = this.classData.find(cls => cls.name === className);
      this.subclasses = selected?.subclasses?.map((scls: any) => scls.name) || [];
      this.characterForm.patchValue({ subclass: '' });

      const skillChoices = selected?.proficiency_choices?.[0]?.skills || [];
      this.skills = skillChoices;
      this.characterForm.patchValue({ classSkills: [] });
      this.selectedClass = selected;

      this.characterForm.patchValue({ savingThrows: (selected?.saving_throws ?? []).map((st: any) => st.name) });
    });

    this.characterForm.get('race')?.valueChanges.subscribe(raceName => {
      const selected = this.raceData.find(race => race.name === raceName);
      this.subraces = selected?.subraces?.map((sr: any) => sr.name) || [];
      this.characterForm.patchValue({ subrace: '' });
      this.selectedRace = selected;
      console.log(selected)
    });

  }

  getFromJson(toGet: string) {
    this._dndService.getFromJson(`${toGet}`).subscribe((data: any[]) => {
      switch (toGet) {
        case 'classes':
          this.classData = data.map((item: any) => ({
            name: item.name,
            subclasses: item.subclasses,
            proficiency_choices: item.proficiency_choices,
            saving_throws: item.saving_throws,
            skillChoose: item.proficiency_choices[0].skillChoose
          }));
          this.classNames = this.classData.map((item: any) => item.name);
          break;

        case 'races':
          this.raceData = data.map((item: any) => ({
            name: item.name,
            speed: item.speed,
            ability_bonuses: item.ability_bonuses,
            alignment: item.alignment,
            age: item.age,
            size: item.size,
            size_description: item.size_description,
            starting_proficiencies: item.starting_proficiencies,
            languages: item.languages,
            traits: item.traits,
            subraces: item.subraces,
          }));
          this.raceNames = this.raceData.map((item: any) => item.name);
          break;

        case 'skills':
          this.skillData = data.map((item: any) => ({
            name: item.name,
            description: item.desc,
            ability_score: item.ability_score
          }));
          break;

        default:
          console.warn(`case for '${toGet}' not handled`);
          break;
      }
    });
  }

  toggleClassSkill(skill: string, check: boolean) {
    const currentSkills = this.characterForm.value.classSkills as string[];
    const maxSkills = this.selectedClass?.skillChoose || 0;

    if (check && currentSkills.length < maxSkills) this.characterForm.patchValue({ classSkills: [...currentSkills, skill] });
    else if (!check) this.characterForm.patchValue({ classSkills: currentSkills.filter(s => s !== skill) });

  }

  toggleBackgroundSkill(skill: string, check: boolean) {
    const currentSkills = this.characterForm.value.backgroundSkills as string[];

    if (check && currentSkills.length < 2) this.characterForm.patchValue({ backgroundSkills: [...currentSkills, skill] });
    else if (!check) this.characterForm.patchValue({ backgroundSkills: currentSkills.filter(s => s !== skill) });

  }

  createCharacter() {
    if (!this.selectedRace) { this.characterForm.patchValue({ subrace: '' }); }
    console.log(this.characterForm.value)
  }

  isSkillSelectedAnywhere(skill: string): boolean {
    const { classSkills, backgroundSkills } = this.characterForm.value;
    return classSkills.includes(skill) || backgroundSkills.includes(skill);
  }

  isClassSkillChecked(skill: string): boolean {
    return this.characterForm.value.classSkills.includes(skill);
  }

  isBackgroundSkillChecked(skill: string): boolean {
    return this.characterForm.value.backgroundSkills.includes(skill);
  }

  isClassSkillDisabled(skill: string): boolean {
    const cs = this.characterForm.value.classSkills;
    return (
      (!cs.includes(skill) && cs.length >= (this.selectedClass?.skillChoose || 0)) ||
      this.characterForm.value.backgroundSkills.includes(skill)
    );
  }

  isBackgroundSkillDisabled(skill: string): boolean {
    const bs = this.characterForm.value.backgroundSkills;
    return (
      (!bs.includes(skill) && bs.length >= 2) ||
      this.characterForm.value.classSkills.includes(skill)
    );
  }

  onStatChange(stat: string, event: Event) {
    this.selectedStatValues[stat] = +(event.target as HTMLSelectElement).value || null;
  }

  getAvailableNumbers(currentStat: string): number[] {
    const selectedNumbers = Object.entries(this.selectedStatValues)
      .filter(([stat, val]) => stat !== currentStat && val !== null)
      .map(([_, val]) => val);
    return this.standardArray.filter(num => !selectedNumbers.includes(num!));
  }

  statValueListeners() {
    for (const stat of this.statNames) {
      const control = this.characterForm.get(stat);
  
      if (control) {
        control.valueChanges.subscribe((value) => {
          this.selectedStatValues[stat] = value ? +value : null;
        });
      }
    }
  }

}