import { Component, inject, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../interfaces/character';
import { Router } from '@angular/router';
import { NameSectionComponent } from "./sections/name-section/name-section.component";
import { TopSectionComponent } from "./sections/top-section/top-section.component";
import { StatsSectionComponent } from "./sections/stats-section/stats-section.component";
import { DndApiService } from '../../../services/dnd-api.service';

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
  characterList: Character[] = [];
  statModifiers: any;
  armorClass: number = 0;
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
      
      this.statModifiers = this.getStatModifiers(this.character.stats);
      this.calculateArmorClass(this.statModifiers.dexterity);
      this.getRaceInfo();
      this.getClassInfo();
    })
  }

  getRaceInfo(): void {
    this._dndApiServce.getRaceInfo(this.character?.race).subscribe((data: any) => {
      this.race = data;
      console.log(data)
    })
  }

  getClassInfo(): void {
    this._dndApiServce.getClassInfo(this.character?.class).subscribe((data: any) => {
      this.class = data;
      console.log(data)
    })
  }

  getStatModifiers(stats?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }): { [key: string]: number } | undefined {
    if (!stats) return;

    const modifiers: { [key: string]: number } = {};

    for (const stat in stats) {
      const key = stat as keyof typeof stats;
      modifiers[key] = this.calculateStatModifier(stats[key]);
    }

    return modifiers;
  }

  calculateStatModifier(stat: number) { return this.statModifiers = Math.floor((stat - 10) / 2); }
  calculateArmorClass(stat: number) { return this.armorClass = 10 + stat; }
}



