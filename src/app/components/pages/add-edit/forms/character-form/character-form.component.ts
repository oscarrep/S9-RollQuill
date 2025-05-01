import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../../../../interfaces/character';
import { DndApiService } from '../../../../../services/dnd-api.service';
import { ButtonComponent } from "../../../../../shared/button/button.component";
import { NavigateService } from '../../../../../services/navigate.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../services/api.service';
import { User } from '../../../../../interfaces/user';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { RaceFormComponent } from "../../../../sections/character-form/race-form/race-form.component";
import { ClassFormComponent } from "../../../../sections/character-form/class-form/class-form.component";
import { SkillsFormComponent } from "../../../../sections/character-form/skills-form/skills-form.component";
import { InputComponent } from '../../../../../shared/input/input.component';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, CommonModule, RaceFormComponent, ClassFormComponent, SkillsFormComponent]
})
export class CharacterFormComponent {
  @Input() character: Character | null = null;
  currentUser: User | null = null;
  form = inject(FormBuilder)
  _dndService = inject(DndApiService)
  _apiService = inject(ApiService)
  _navigationService = inject(NavigateService)
  _formValidation = inject(FormValidationService);

  characterForm: FormGroup;
  submitted: boolean = false;

  route = inject(ActivatedRoute)
  userId: string = '';

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
      createdBy: [''],
      name: ['', Validators.required],
      race: ['', Validators.required],
      subrace: ['', Validators.required],
      class: ['', Validators.required],
      subclass: ['', Validators.required],
      level: [1],
      speed: [''],
      ability_bonuses: [[]],

      STR: [0, Validators.required],
      DEX: [0, Validators.required],
      CON: [0, Validators.required],
      INT: [0, Validators.required],
      WIS: [0, Validators.required],
      CHA: [0, Validators.required],

      savingThrows: [[]],
      classSkills: [[], Validators.required],
      backgroundSkills: [[], Validators.required],
      expertise: [''],
    })

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('uid')!;
      this._apiService.getUser(this.userId).subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser)
      });
    });
  }

  ngOnInit() {
    this.getFromJson('classes');
    this.getFromJson('races');
    this.getFromJson('skills');
    this.statValueListeners();
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
          this.skillData = data.map((item: any) => ({ name: item.name }));
          console.log(this.skillData)
          break;

        default:
          console.warn(`case for '${toGet}' not handled`);
          break;
      }
    });
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

  public isInvalid = (controlName: string): boolean => {
    return this._formValidation.isInvalid(
      this.characterForm,
      controlName,
      this.submitted,
      () => controlName !== 'subrace' || this.selectedRace?.subraces?.length > 0
    );
  };


  onRaceChange(selected: any) {
    this.selectedRace = selected;
    this.subraces = selected?.subraces?.map((sr: any) => sr.name) || [];
  }

  createCharacter() {
    this.submitted = true;

    if (this.characterForm.invalid) {
      this.characterForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      console.log('name ', this.characterForm.get('name')?.errors);
      console.log('race ', this.characterForm.get('race')?.errors);
      console.log('subrace ', this.characterForm.get('subrace')?.errors);
      console.log('class ', this.characterForm.get('class')?.errors);
      console.log('nasubclassme ', this.characterForm.get('subclass')?.errors);
      return;
    }

    const form = this.characterForm.value;
    const character: Character = {
      createdBy: this.currentUser!._id!,
      name: form.name,
      race: form.race,
      subrace: form.subrace || '',

      class: form.class,
      subclass: form.subclass,
      level: form.level || 1,
      speed: form.speed,

      ability_scores: {
        STR: [{ name: 'Strength', value: Number(form.STR) }],
        DEX: [{ name: 'Dexterity', value: Number(form.DEX) }],
        CON: [{ name: 'Constitution', value: Number(form.CON) }],
        INT: [{ name: 'Intelligence', value: Number(form.INT) }],
        WIS: [{ name: 'Wisdom', value: Number(form.WIS) }],
        CHA: [{ name: 'Charisma', value: Number(form.CHA) }],
      },

      savingThrows: form.savingThrows || [],

      classSkills: form.classSkills.map((s: any) => typeof s === 'string' ? s : s.name),
      backgroundSkills: form.backgroundSkills.map((s: any) => typeof s === 'string' ? s : s.name),

      expertise: form.expertise || [],
      image: '',
    };

    this._apiService.saveCharacter(character).subscribe((savedCharacter: Character) => {
      if (!this.currentUser!.characters) this.currentUser!.characters = [];
      this.currentUser!.characters.push(savedCharacter._id!);

      this._apiService.updateUser(this.userId, this.currentUser!);

      this._navigationService.navigateTo(`${this.userId}/character/${savedCharacter._id}`);
    });

    console.log(this.characterForm.value)
  }

}