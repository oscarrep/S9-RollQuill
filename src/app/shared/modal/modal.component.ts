import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HpEditModalComponent } from "./hp-modal/hp-modal.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone:true,
  imports: [HpEditModalComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() type: string | null = null;
  @Input() currentHp!: number;
  @Input() maxHp!: number;
  @Input() characterId!: string;
  @Output() closed = new EventEmitter<void>();
  @Output() hpUpdated = new EventEmitter<number>();

}
