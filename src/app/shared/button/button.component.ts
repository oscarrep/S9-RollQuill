import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  standalone:true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  text = input<string>()
  home = input<boolean>()
  login = input<boolean>()

  @Output() buttonClick = new EventEmitter<void>();

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
