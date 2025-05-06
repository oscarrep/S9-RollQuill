import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-compendium',
  imports: [],
  standalone: true,
  templateUrl: './card-compendium.component.html',
  styleUrl: './card-compendium.component.scss'
})
export class CardCompendiumComponent {
  @Input() name: string = '';

  imgName: string = '';

  ngOnInit() { this.imgName = this.name.toLowerCase(); }
}
