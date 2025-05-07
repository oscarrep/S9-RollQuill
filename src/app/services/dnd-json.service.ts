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

  getSkills(): Observable<{ name: string, desc:string, stat: string }[]> {
    return this._dndService.getFromJson('skills').pipe(
      map((data: any[]) =>
        data.map(item => ({
          name: item.name,
          desc: item.desc,
          stat: item.ability_score.name
        }))
      )
    );
  }
  
  getRaceByName(name: string): Observable<any> {
    return this._dndService.getFromJson('races').pipe(
      map(races => races.find(r => r.name.toLowerCase() === name))
    );
  }

  getClassByName(name: string): Observable<any> {
    return this._dndService.getFromJson('classes').pipe(
      map(classes => classes.find(c => c.name.toLowerCase() === name))
    );
  }
  
}

