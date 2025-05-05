import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-death-checkbox',
  imports: [],
  standalone:true,
  templateUrl: './death-checkbox.component.html',
  styleUrl: './death-checkbox.component.scss'
})
export class DeathCheckboxComponent {
  @Input() type: 'fail' | 'success' = 'fail';
  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  toggleCheck() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

}
