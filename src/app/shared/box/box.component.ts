import { Component, EventEmitter, inject, Input, input, Output, ViewChild } from '@angular/core';
import { DeathCheckboxComponent } from '../death-checkbox/death-checkbox.component';

type DeathSaveType = 'fail' | 'success';

@Component({
  selector: 'app-box',
  imports: [DeathCheckboxComponent],
  standalone:true,
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  title = input<string>();
  num = input<number | string>();
  score = input<number>();
  proficiencyBonus = input<number>();
  modifier = input<number>();
  large = input<boolean>();
  long = input<boolean>();
  deathSaves = input<boolean>();
  statBox = input<boolean>();
  proficient = input<boolean>();
  @Input() currentHp?: number | string;
  @Input() isHp: boolean = false;
  @Input() characterId!: string;
  
  @Output() open = new EventEmitter<string>();

  deathSavesArr: { type: DeathSaveType; checked: boolean }[] = [
    { type: 'fail', checked: false },
    { type: 'fail', checked: false },
    { type: 'fail', checked: false },
    { type: 'success', checked: false },
    { type: 'success', checked: false },
    { type: 'success', checked: false }
  ];
  
  openModal() { this.open.emit('hp'); }

  calculateProficiency(modifier: number, pb: number) { return modifier + pb; }
}
