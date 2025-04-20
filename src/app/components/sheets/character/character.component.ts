import { Component, inject, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../interfaces/character';
import { ActivatedRoute, Router } from '@angular/router';
import { NameSectionComponent } from "./sections/name-section/name-section.component";
import { TopSectionComponent } from "./sections/top-section/top-section.component";
import { StatsSectionComponent } from "./sections/stats-section/stats-section.component";

@Component({
  selector: 'app-character',
  imports: [NameSectionComponent, TopSectionComponent, StatsSectionComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  private _characterService = inject(CharacterService);
  character?: Character;
  characterList: Character[] = [];
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
    })
  }
}



