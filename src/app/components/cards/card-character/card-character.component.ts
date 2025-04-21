import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-card-character',
  imports: [],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {

  app = inject(AppComponent);
}
