import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private appUrl: string;
  private apiCharacters: string;
  private apiUsers: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.host;
    this.apiCharacters = environment.apiCharacters;
    this.apiUsers = environment.apiUsers;
  }

  getCharacterList(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.appUrl}${this.apiCharacters}`);
  }

  deleteCharacter(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiCharacters}/${id}`)
  }

  saveCharacter(character: Character): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiCharacters}`, character)
  }

  getCharacter(id: string | undefined): Observable<Character> {
    return this.http.get<Character>(`${this.appUrl}${this.apiCharacters}/${id}`)
  }

  updateCharacter(id: string | undefined, character: Character): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiCharacters}/${id}`, character)
  }

  getUser(uid: string | undefined):Observable<User>{
    return this.http.get<User>(`${this.appUrl}${this.apiUsers}/${uid}`)
  }

  getCharactersByIds(ids: string[]): Observable<Character[]> {
    return this.http.post<Character[]>(`${this.appUrl}${this.apiCharacters}/batch`, { ids });
  }
}
