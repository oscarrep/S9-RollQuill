import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from "../../input/input.component";

@Component({
  selector: 'app-img-modal',
  imports: [InputComponent],
  templateUrl: './img-modal.component.html',
  styleUrl: './img-modal.component.scss'
})
export class ImgModalComponent {
  @Input() characterId!: string;
  @Output() updated = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();
}
