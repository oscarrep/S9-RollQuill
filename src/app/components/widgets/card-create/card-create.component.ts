import { Component, inject, Input } from '@angular/core';
import { Character } from '../../../interfaces/character';
import { NavigateService } from '../../../services/navigate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-create',
  imports: [],
  standalone:true,
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})
export class CardCreateComponent {
  _navigateService = inject(NavigateService);
  route = inject(ActivatedRoute);
  @Input() character!: Character;
  userId: string = ''

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('uid')!;
    });
  }

  navCreate() {
    this._navigateService.navigateTo(`${this.userId}/create`);
  }

}
