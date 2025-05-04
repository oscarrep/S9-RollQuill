import { Component, Input, input } from '@angular/core';
import { DeathCheckboxComponent } from '../death-checkbox/death-checkbox.component';
type DeathSaveType = 'fail' | 'success';

@Component({
  selector: 'app-box',
  imports: [DeathCheckboxComponent],
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

  deathSavesArr: { type: DeathSaveType; checked: boolean }[] = [
    { type: 'fail', checked: false },
    { type: 'fail', checked: false },
    { type: 'fail', checked: false },
    { type: 'success', checked: false },
    { type: 'success', checked: false },
    { type: 'success', checked: false }
  ];

  calculateProficiency(modifier: number, pb: number) { return modifier + pb; }
}
