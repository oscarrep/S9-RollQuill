import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { BoxComponent } from '../../../shared/box/box.component';

@Component({
  selector: 'app-top-section',
  imports: [BoxComponent],
  standalone:true,
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.scss'
})
export class TopSectionComponent {
  armorClass = input<number>()
  initiative = input<number>()
  speed = input<number>()
  hp = input<number>()
  currentHp = input<number>()
  proficiencyBonus = input<number>()
  @Input() characterId!: string;
  @Output() open = new EventEmitter<string>();

  openImgModal(){
    this.open.emit('img');
  }
}
