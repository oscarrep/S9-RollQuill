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
import { RaceFormComponent } from "./race-form/race-form.component";
import { ClassFormComponent } from './class-form/class-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { InputComponent } from '../../../../../shared/input/input.component';
import { DndJsonService } from '../../../../../services/dnd-json.service';

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
  currentUserId: string = '';
  form = inject(FormBuilder)
  _dndJSONService = inject(DndJsonService)
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
      ability_bonuses: [0],

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
        this.currentUserId = user._id;
        console.log(this.currentUserId)
      });
    });
  }

  ngOnInit() {
    this._dndJSONService.getClasses().subscribe(data => {
      this.classData = data;
      this.classNames = data.map(item => item.name);
    });
  
    this._dndJSONService.getRaces().subscribe(data => {
      this.raceData = data;
      this.raceNames = data.map(item => item.name);
    });
  
    this._dndJSONService.getSkills().subscribe(data => {
      this.skillData = data;
      console.log(this.skillData);
    });
  
    this.statValueListeners();
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
    console.log(this.currentUserId);
    const form = this.characterForm.value;
    const character: Character = {
      createdBy: this.currentUserId,
      name: form.name,
      race: form.race,
      subrace: form.subrace || '',

      class: form.class,
      subclass: form.subclass,
      level: form.level || 1,
      speed: form.speed,
      ability_bonuses: form.ability_bonuses.map((bonus: any) => ({
        name: bonus.name,
        value: bonus.value,
      })),

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
      image: form.image || '',
    };
    console.log(this.currentUserId);
    this._apiService.saveCharacter(character).subscribe({
      next: (savedCharacter: Character) => {
        const newCharId = savedCharacter._id!;

        this._apiService.addCharacterToUser(this.userId, newCharId).subscribe({
          next: () => {
            this._navigationService.navigateTo(`${this.userId}/character/${newCharId}`);
          },
          error: (err) => {
            console.error('Error updating user with new character:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error creating character:', err);
      }
    });

    console.log(this.characterForm.value)
  }

}