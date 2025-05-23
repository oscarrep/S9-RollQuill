import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../button/button.component";
import { InputComponent } from '../../input/input.component';
import { saveHpLocally } from '../../../services/hp.service';

@Component({
  selector: 'app-hp-modal',
  templateUrl: './hp-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent]
})
export class HpModalComponent {
  @Input() currentHp!: number;
  @Input() maxHp!: number;
  @Input() characterId!: string;
  @Output() updated = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();
  hp = 0;

  ngOnInit() {
    this.hp = Number(this.currentHp)
  }

  changeHp(amount: number): void {
    this.hp += amount;
  }

  onHpInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.hp = parseInt(value, 10) || 0;
  }

  apply(): void {
    saveHpLocally(this.characterId, this.hp);
    this.updated.emit(this.hp);
  }

  close(): void {
    this.onClose.emit();
  }


}
