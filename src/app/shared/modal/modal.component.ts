import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HpModalComponent } from "./hp-modal/hp-modal.component";
import { ButtonComponent } from '../button/button.component';
import { ImgModalComponent } from './img-modal/img-modal.component';
import { Character } from '../../interfaces/character';
import { PremiumModalComponent } from './premium-modal/premium-modal.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [HpModalComponent, ButtonComponent, ImgModalComponent, PremiumModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() type: string | null = null;
  @Input() currentHp!: number;
  @Input() maxHp!: number;
  @Input() user!: User;
  @Input() characterId!: string;
  @Input() character!: Character;
  
  @Output() closed = new EventEmitter<void>();
  @Output() hpUpdated = new EventEmitter<number>();
  @Output() updated = new EventEmitter<number>();

}
