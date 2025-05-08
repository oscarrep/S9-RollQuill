import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent } from "../../button/button.component";
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-premium-modal',
  imports: [ButtonComponent],
  templateUrl: './premium-modal.component.html',
  styleUrl: './premium-modal.component.scss'
})
export class PremiumModalComponent {
  @Input() characterId!: string;
  @Input() user!: User;
  @Output() updated = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();
  _apiService = inject(ApiService);

  setPremium(user: User): void {

    const updatedUser: User = {
      ...user,
      premium: true,
    };

    this._apiService.updateUser(this.user._id, updatedUser).subscribe(() => {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.updated.emit(1);
      this.onClose.emit();
    });
  }
}
