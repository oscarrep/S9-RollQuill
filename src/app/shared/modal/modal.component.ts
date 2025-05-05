import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HpEditModalComponent } from "./hp-modal/hp-modal.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  imports: [HpEditModalComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() type: string | null = null;
  @Output() closed = new EventEmitter<void>();

}
