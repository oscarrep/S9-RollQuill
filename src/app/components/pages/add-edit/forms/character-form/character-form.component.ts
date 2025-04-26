import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../../../../interfaces/character';
import { DndApiService } from '../../../../../services/dnd-api.service';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { NavigateService } from '../../../../../services/navigate.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent]
})
export class CharacterFormComponent {
  @Input() character: Character | null = null;
  form = inject(FormBuilder)
  _dndService = inject(DndApiService)
  _navigationService = inject(NavigateService)
  characterForm: FormGroup;

  standardArray: number[] = [8, 10, 12, 13, 14, 15]

  classData: any[] = []
  raceData: any[] = []

  classNames: string[] = [];
  subclasses: string[] = [];
  raceNames: string[] = [];
  subraces: string[] = [];

  skills: string[] = [];

  constructor() {
    this.characterForm = this.form.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      stats: [[''], Validators.required],
      subrace: ['', Validators.required],
      class: ['', Validators.required],
      subclass: [''],
      skills: [[''], Validators.required],
      expertise: [''],
      level: [1],
      savingThrows: [[''], Validators.required],
    })
  }

  ngOnInit() {
    this.getFromJson('classes');
    this.getFromJson('races');

    this.formValueChanges('class', this.classData, selected => {
      this.subclasses = selected.subclasses?.map((subclass: any) => subclass.name) || [];
      this.skills = selected.proficiency_choices?.[0]?.skills || [];
      this.characterForm.patchValue({ subclass: '', skills: [], savingThrows: (selected.saving_throws ?? []).map((st: any) => st.name) });
    });
  
    this.formValueChanges('race', this.raceData, selected => {
      this.subraces = selected.subraces?.map((subrace: any) => subrace.name) || [];
      this.characterForm.patchValue({ subrace: '' });
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
          }));
          this.classNames = this.classData.map((item: any) => item.name);
          break;

        case 'races':
          this.raceData = data.map((item: any) => ({
            name: item.name,
            subraces: item.subraces,
          }));
          this.raceNames = this.raceData.map((item: any) => item.name);
          break;

        default:
          console.warn(`case for '${toGet}' not handled`);
          break;
      }
    });
  }

  formValueChanges(formName: string, dataList: any[], updateFn: (selected: any) => void) {
    this.characterForm.get(formName)?.valueChanges.subscribe(name => {
      const selected = dataList.find(item => item.name === name);
      if (selected) {
        updateFn(selected);
      }
    });
  }

  toggleSkill(event: Event, skill: string) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    const currentSkills = this.characterForm.value.skills as string[];
    if (isChecked) {
      if (currentSkills.length < 4) { // enforce only 4 selections
        this.characterForm.patchValue({ skills: [...currentSkills, skill] });
      }
    } else {
      this.characterForm.patchValue({ skills: currentSkills.filter(s => s !== skill) });
    }
  }

  createCharacter() {

  }
}