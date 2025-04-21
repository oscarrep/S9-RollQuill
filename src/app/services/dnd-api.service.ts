import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private hostUrl: string;
  private races: string;
  private classes: string;
  private levels: string;

  constructor(private http: HttpClient) {
    this.hostUrl = environment.dndHost;
    this.races = environment.dndRaces;
    this.classes = environment.dndClasses;
    this.levels = environment.dndLevels;
  }

  getRaces():Observable<any>{
    return this.http.get<any[]>(`${this.hostUrl}${this.races}`);
  }

  getRaceInfo(race:string|undefined):Observable<any>{
    return this.http.get<any[]>(`${this.hostUrl}${this.races}/${race}`);
  }

  getClassInfo(_class:string|undefined):Observable<any>{
    return this.http.get<any[]>(`${this.hostUrl}${this.classes}/${_class}`);
  }
  getClassLevelInfo(_class:string|undefined, level:number|undefined):Observable<any>{
    return this.http.get<any[]>(`${this.hostUrl}${this.classes}/${_class}${this.levels}/${level}`);
  }
}
