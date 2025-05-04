import { inject, Injectable } from '@angular/core';
import { DndApiService } from './dnd-api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndJsonService {
  classData: any[] = []
  raceData: any[] = []
  skillData: any[] = []
  _dndService = inject(DndApiService)
  classNames: string[] = [];
  raceNames: string[] = [];


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
          this.skillData = data.map((item: any) => ({ name: item.name, stat: item.ability_score.name }));
          console.log(this.skillData)
          break;

        default:
          console.warn(`case for '${toGet}' not handled`);
          break;
      }
    });
  }


  getClasses(): Observable<{ name: string, subclasses: any[], saving_throws: any[], skillChoose: any }[]> {
    return this._dndService.getFromJson('classes').pipe(
      map((data: any[]) =>
        data.map(item => ({
          name: item.name,
          subclasses: item.subclasses,
          proficiency_choices: item.proficiency_choices,
          saving_throws: item.saving_throws,
          skillChoose: item.proficiency_choices[0].skillChoose
        }))
      )
    );
  }

  getRaces(): Observable<{ name: string, speed: number, subraces: any[] }[]> {
    return this._dndService.getFromJson('races').pipe(
      map((data: any[]) =>
        data.map(item => ({
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
        }))
      )
    );
  }

  getSkills(): Observable<{ name: string, stat: string }[]> {
    return this._dndService.getFromJson('skills').pipe(
      map((data: any[]) =>
        data.map(item => ({
          name: item.name,
          stat: item.ability_score.name
        }))
      )
    );
  }
}

