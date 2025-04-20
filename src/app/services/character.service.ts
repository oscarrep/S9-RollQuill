import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { Observable } from 'rxjs';
import  {environment}  from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private appUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.host;
    this.apiUrl = environment.apiCharacters;
  }

  getCharacterList(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.appUrl}${this.apiUrl}`);
  }

  deleteCharacter(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}/${id}`)
  }

  saveCharacter(character: Character): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, character)
  }

  getCharacter(id: string | undefined): Observable<Character> {
    return this.http.get<Character>(`${this.appUrl}${this.apiUrl}/${id}`)
  }

  updateCharacter(id: string | undefined, character: Character): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}/${id}`, character)
  }
}
