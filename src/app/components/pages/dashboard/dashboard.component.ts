import { Component, inject, signal } from '@angular/core';
import { SectionCharacterComponent } from "../../sections/section-character/section-character.component";
import { SectionCompendiumComponent } from '../../sections/section-compendium/section-copendium.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { Character } from '../../../interfaces/character';
@Component({
  selector: 'app-dashboard',
  imports: [SectionCharacterComponent, SectionCompendiumComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private route = inject(ActivatedRoute)
  private _apiService = inject(ApiService)
  user?: User;
  characterList = signal<Character[]>([]);


  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      const ids = this.user!.characters;
      if (ids?.length) {
        this._apiService.getCharactersByIds(ids).subscribe(chars => {
          this.characterList.set(chars);
        });
      }
    }
  }
}