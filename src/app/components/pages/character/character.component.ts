import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Character } from '../../../interfaces/character';
import { Router } from '@angular/router';
import { NameSectionComponent } from '../../sections/name-section/name-section.component';
import { TopSectionComponent } from '../../sections/top-section/top-section.component';
import { StatsSectionComponent } from '../../sections/stats-section/stats-section.component';
import { DndApiService } from '../../../services/dnd-api.service';
import { forkJoin } from 'rxjs';
import { SkillsSectionComponent } from "../../sections/skills-section/skills-section.component";
import { DndJsonService } from '../../../services/dnd-json.service';
import { STAT_NAME_MAP } from '../../../shared/stat-map';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { loadHpLocally } from '../../../services/hp.service';
import { CharacterFooterComponent } from "../../sections/character-footer/character-footer.component";

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NameSectionComponent, TopSectionComponent, StatsSectionComponent, SkillsSectionComponent, ModalComponent, CharacterFooterComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  router = inject(Router);
  private _apiService = inject(ApiService);
  private _dndApiService = inject(DndApiService);
  private _dndJSONService = inject(DndJsonService);
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
  skillData: { name: string, stat: string }[] | undefined;
  modalType: string | null = null;
  characterId!: string;
  imageUrl: string = '';


  ngOnInit(): void {
    this.getCharData();
    this._dndJSONService.getSkills().subscribe(data => {
      this.skillData = data;
      console.log(this.skillData);
    });
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
      this.characterId = data._id!;
      this.imageUrl = data.image!;
      console.log(this.character);


      this.abilityScores = this.transformAbilityScores(this.character.ability_scores)!;
      this.abilityScores = this.calculateRaceStatBonuses(this.abilityScores, this.character.ability_bonuses)!;
      this.abilityModifiers = this.getabilityModifiers(this.abilityScores)!;

      this.skillProficiencies = this.character?.classSkills.concat(this.character.backgroundSkills);
      this.savingThrowProficiencies = this.character?.savingThrows;

      forkJoin({
        race: this._dndJSONService.getRaceByName(this.character.race.toLowerCase()),
        class: this._dndJSONService.getClassByName(this.character.class.toLowerCase()),
        levelInfo: this._dndApiService.getClassLevelInfo(this.character.class.toLowerCase(), this.character.level)
      }).subscribe(({ race, class: classData, levelInfo }) => {
        this.race = race
        this.class = classData
        this.levelInfo = levelInfo

        console.log(this.race);
        console.log(this.class);
        console.log(this.levelInfo);
        console.log(this.abilityModifiers);
        console.log(this.skillProficiencies);
        console.log(this.savingThrowProficiencies);

        this.calculateMaxHitPoints(this.class!.hit_die, this.character!.level);
        this.calculateArmorClass(this.abilityModifiers['Dexterity']);
        this.currentHp = loadHpLocally(this.character?._id!, this.hitPoints);
      });
    });
  }

  getabilityModifiers(abilityScores: { [key: string]: number }) {
    const modifiers: { [key: string]: number } = {};

    for (const key in abilityScores) {
      const score = abilityScores[key];
      modifiers[key] = this.calculateStatModifier(score);
    }

    return modifiers;
  }

  transformAbilityScores(ability_scores?: { [key: string]: [{ name: string; value: number }]; }): { [key: string]: number } | undefined {
    if (!ability_scores) return;

    const output: { [key: string]: number } = {};

    for (const key in ability_scores) {
      const arr = ability_scores[key];
      if (arr && arr.length > 0) output[arr[0].name] = arr[0].value;
    }

    return output;
  }

  calculateStatModifier(stat: number) { return Math.floor((stat - 10) / 2); }
  calculateArmorClass(stat: number) { return this.armorClass = 10 + stat; }
  calculateRaceStatBonuses(abilityScores: any, raceBonuses: any) {
    const updatedScores = { ...abilityScores };

    for (const bonus of raceBonuses) {
      const fullName = STAT_NAME_MAP[bonus.name];
      if (fullName && updatedScores[fullName] !== undefined) {
        updatedScores[fullName] += bonus.value;
      }
    }

    return updatedScores;
  }
  calculateMaxHitPoints(hitDie: number, level: number) {
    const conModifier = this.abilityModifiers['Constitution'];
    const lvlOneFormula = hitDie + conModifier;
    const average = 1 + (hitDie / 2);
    const levelsAfterOne = level - 1;

    if (level === 1)
      return this.hitPoints = lvlOneFormula;
    else if (level > 1)
      return this.hitPoints = lvlOneFormula + ((average + conModifier) * levelsAfterOne);

    return this.hitPoints = 0;
  }

  levelUp(){

  }

  onOpenModal(type: string) {
    this.modalType = type;
  }

  onCloseModal() {
    this.modalType = null;
  }
}