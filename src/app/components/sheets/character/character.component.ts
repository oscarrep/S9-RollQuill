import { Component, inject, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../interfaces/character';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  private _characterService = inject(CharacterService);
  characterList: Character[] = [];

  ngOnInit(): void {
    this.getCharList();
  }


  getCharList(): void {
    this._characterService.getCharacterList().subscribe((data: Character[]) => {
      this.characterList = data;
      console.log(this.characterList)
    })
  }
}



