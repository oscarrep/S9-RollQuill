import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockNavigateService {
  navigateTo = jest.fn();
}