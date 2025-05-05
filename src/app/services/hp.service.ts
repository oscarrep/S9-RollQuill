import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HpService {


}
const HP_KEY = (characterId: string) => `hp-${characterId}`;

export function saveHpLocally(characterId: string, hp: number) {
  localStorage.setItem(HP_KEY(characterId), hp.toString());

}

export function loadHpLocally(characterId: string, fallback: number): number {
  const stored = localStorage.getItem(HP_KEY(characterId));
  return stored !== null ? parseInt(stored, 10) : fallback;
}
