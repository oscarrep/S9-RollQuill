import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Character } from '../../../interfaces/character';
import { Router } from '@angular/router';
import { NameSectionComponent } from '../../sections/name-section/name-section.component';
import { TopSectionComponent } from '../../sections/top-section/top-section.component';
import { StatsSectionComponent } from '../../sections/stats-section/stats-section.component';
import { DndApiService } from '../../../services/dnd-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character',
  imports: [NameSectionComponent, TopSectionComponent, StatsSectionComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  router = inject(Router);
  private _apiService = inject(ApiService);
  private _dndApiServce = inject(DndApiService);
  character?: Character;
  race?: any;
  class?: any;
  levelInfo?: any;
  characterList: Character[] = [];
  savingThrowProficiencies: string[] = [];
  skillProficiencies: string[] = [];

  abilityModifiers: { [key: string]: number } = {};
  abilityScores: { [key: string]: number } = {};

  armorClass: number = 0;
  hitPoints: number = 0;
  currentHp: number = 0;
  @Input() id!: string;

  ngOnInit(): void {
    this.getCharData();
  }

  getCharList(): void {
    this._apiService.getCharacterList().subscribe((data: Character[]) => {
      this.characterList = data;
      console.log(this.characterList);
    })
  }

  getCharData(): void {
    this._apiService.getCharacter(this.id).subscribe((data: Character) => {
      this.character = data;
      console.log(this.character);

      this.abilityModifiers = this.getabilityModifiers(this.character.ability_scores)!;
      this.abilityScores = this.transformAbilityScores(this.character.ability_scores)!;
      this.skillProficiencies = this.character?.classSkills.concat(this.character.backgroundSkills);
      this.savingThrowProficiencies = this.character?.savingThrows;

      forkJoin({
        race: this._dndApiServce.getRaceInfo(this.character.race.toLowerCase()),
        class: this._dndApiServce.getClassInfo(this.character.class.toLowerCase()),
        levelInfo: this._dndApiServce.getClassLevelInfo(this.character.class.toLowerCase(), this.character.level)
      }).subscribe(({ race: raceData, class: classData, levelInfo: levelData }) => {
        this.race = raceData;
        this.class = classData;
        this.levelInfo = levelData;
        console.log(this.race)
        console.log(this.class)
        console.log(this.levelInfo)
        console.log(this.abilityModifiers)
        console.log(this.skillProficiencies)
        console.log(this.savingThrowProficiencies)

        this.calculateMaxHitPoints(this.class!.hit_die, this.character!.level);
        this.calculateArmorClass(this.abilityModifiers['Dexterity']);
      });
    });
  }

  getabilityModifiers(ability_scores?: { [key: string]: [{ name: string; value: number }] }): { [key: string]: number } | undefined {
    if (!ability_scores) return;

    const modifiers: { [key: string]: number } = {};

    for (const key in ability_scores) {
      const scoreArray = ability_scores[key];
      if (scoreArray && scoreArray.length > 0) {
        const score = scoreArray[0];
        if (score && typeof score.value === 'number') {
          modifiers[score.name] = this.calculateStatModifier(score.value);
        }
      }
    }

    return modifiers;
  }

  transformAbilityScores(ability_scores?: { [key: string]: [{ name: string; value: number }]; }): { [key: string]: number } | undefined {
    if (!ability_scores) return;

    const output: { [key: string]: number } = {};

    for (const key in ability_scores) {
      const arr = ability_scores[key];
      if (arr && arr.length > 0) {
        output[arr[0].name] = arr[0].value;
      }
    }

    return output;
  }

  calculateStatModifier(stat: number) { return Math.floor((stat - 10) / 2); }
  calculateArmorClass(stat: number) { return this.armorClass = 10 + stat; }
  calculateMaxHitPoints(hitDie: number, level: number) {
    const conModifier = this.abilityModifiers['Constitution'];
    const lvlOneFormula = hitDie + conModifier;
    const average = 1 + (hitDie / 2);
    const levelsAfterOne = level - 1;

    if (level === 1) {
      return this.hitPoints = lvlOneFormula;
    } else if (level > 1) {
      return this.hitPoints = lvlOneFormula + ((average + conModifier) * levelsAfterOne);
    }

    return this.hitPoints = 0;
  }
}



