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
  private form = inject(FormBuilder)
  _dndService = inject(DndApiService)
  _navigationService = inject(NavigateService)
  characterForm: FormGroup;

  classData: any[]=[]
  raceData: any[]=[]

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

    this.characterForm.get('class')?.valueChanges.subscribe(className => {
      const selected = this.classData.find(_class => _class.name === className);
      this.subclasses = selected?.subclasses?.map((s: any) => s.name) || [];
      this.characterForm.patchValue({ subclass: '' });

      console.log(this.subclasses)

      const skills = selected?.proficiency_choices?.[0]?.skills || [];
      this.characterForm.patchValue({ skills: [] });
      this.skills = skills;
      this.characterForm.patchValue({ savingThrows: (selected?.saving_throws ?? []).map((st: any) => st.name) });
    });

    this.characterForm.get('race')?.valueChanges.subscribe(raceName => {
      const selected = this.raceData.find(race => race.name === raceName);
      this.subraces = selected?.subraces?.map((sr: any) => sr.name) || [];
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
          console.log(this.classData);
          console.log(this.classNames);
          break;
        case 'races':
          this.raceData = data.map((item: any) => ({
            name: item.name,
            subraces: item.subraces,
          }));
          this.raceNames = this.raceData.map((item: any) => item.name);
          console.log(this.raceData);
          console.log(this.raceNames);
          break;
        default:
          console.warn(`case for '${toGet}' not handled`);
          break;
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