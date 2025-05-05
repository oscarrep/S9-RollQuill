import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-skill-checkbox',
  imports: [],
  standalone:true,
  templateUrl: './skill-checkbox.component.html',
  styleUrl: './skill-checkbox.component.scss'
})
export class SkillCheckboxComponent {
  @Input() skillObj?: { name: string; desc: string[]; ability_score: { name: string } } = { name: '', desc: [], ability_score: { name: '' } };
  @Input() skill!: string
  @Input() checked = false;
  @Input() disabled = false;

  @Output() skillToggled = new EventEmitter<{ skill: string, checked: boolean }>();

  onToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.skillToggled.emit({ skill: this.skill, checked: input.checked });
  }
}
