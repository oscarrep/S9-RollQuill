import { Component, inject, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../interfaces/character';
import { Router } from '@angular/router';
import { NameSectionComponent } from "./sections/name-section/name-section.component";
import { TopSectionComponent } from "./sections/top-section/top-section.component";
import { StatsSectionComponent } from "./sections/stats-section/stats-section.component";
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
  private _characterService = inject(CharacterService);
  private _dndApiServce = inject(DndApiService);
  character?: Character;
  race?: any;
  class?: any;
  levelInfo?: any;
  characterList: Character[] = [];
  savingThrowProficiencies: string[] = [];
  skillProficiencies: string[] = [];
  abilityModifiers: any;
  armorClass: number = 0;
  hitPoints: number = 0;
  currentHp: number = 0;
  @Input() id!: string;

  ngOnInit(): void {
    this.getCharData();
  }

  getCharList(): void {
    this._characterService.getCharacterList().subscribe((data: Character[]) => {
      this.characterList = data;
      console.log(this.characterList);
    })
  }

  getCharData(): void {
    this._characterService.getCharacter(this.id).subscribe((data: Character) => {
      this.character = data;
      console.log(this.character);

      this.abilityModifiers = this.getabilityModifiers(this.character.stats);
      this.skillProficiencies=this.character?.skills;
      this.savingThrowProficiencies=this.character?.savingThrows;

      forkJoin({
        race: this._dndApiServce.getRaceInfo(this.character.race),
        class: this._dndApiServce.getClassInfo(this.character.class),
        levelInfo: this._dndApiServce.getClassLevelInfo(this.character.class, this.character.level)
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
        this.calculateArmorClass(this.abilityModifiers.Dexterity);
      });
    });
  }

  getabilityModifiers(stats?: {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
  }): { [key: string]: number } | undefined {
    if (!stats) return;

    const modifiers: { [key: string]: number } = {};

    for (const stat in stats) {
      const key = stat as keyof typeof stats;
      modifiers[key] = this.calculateStatModifier(stats[key]);
    }

    return modifiers;
  }

  getSkillProficiencies() { return this.character!.skills; }
  calculateStatModifier(stat: number) { return Math.floor((stat - 10) / 2); }
  calculateArmorClass(stat: number) { return this.armorClass = 10 + stat; }
  calculateMaxHitPoints(hitDie: number, level: number) {
    const lvlOneFormula = hitDie + this.abilityModifiers.Constitution;
    const average = 1 + (hitDie / 2);
    const levelsAfterOne = level - 1;
    if (level === 1) return this.hitPoints = lvlOneFormula;
    else if (level > 1) return this.hitPoints = lvlOneFormula + ((average + this.abilityModifiers.Constitution) * levelsAfterOne);
  }
}



