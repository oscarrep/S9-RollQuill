import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardCharacterComponent } from '../../../widgets/card-character/card-character.component';
import { CardCreateComponent } from '../../../widgets/card-create/card-create.component';
import { ButtonComponent } from "../../../../shared/button/button.component";
import { Character } from '../../../../interfaces/character';
import { NavigateService } from '../../../../services/navigate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-character',
  standalone:true,
  imports: [CardCharacterComponent, CardCreateComponent, ButtonComponent],
  templateUrl: './section-character.component.html',
  styleUrl: './section-character.component.scss'
})
export class SectionCharacterComponent {
  @Input() characters: Character[] = [];
  @Input() premium: any;
  _navigateService = inject(NavigateService);
  route = inject(ActivatedRoute);
  userId: string = ''
  @Output() requestPremium = new EventEmitter<void>();

  constructor() {
    this.route.paramMap.subscribe(params => {this.userId = params.get('uid')!;});
  }

  isPremium(){
    if(this.premium) this.navCreate();
      else this.requestPremium.emit();
  }

  navCreate() { this._navigateService.navigateTo(`${this.userId}/create`); }

  getCharId(char: Character): string { return char?._id ?? crypto.randomUUID(); }
}
