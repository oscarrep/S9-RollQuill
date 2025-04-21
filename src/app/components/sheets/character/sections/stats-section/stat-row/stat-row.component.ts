import { Component, input } from '@angular/core';
import { BoxComponent } from "../../box/box.component";

@Component({
  selector: 'app-stat-row',
  imports: [BoxComponent],
  templateUrl: './stat-row.component.html',
  styleUrl: './stat-row.component.scss'
})
export class StatRowComponent {
  abilityScores = input<{ name: string; value: number }[]>();
  abilityModifiers = input<{ name: string; value: number }[]>();


  ngOnInit() { console.log('stat-row', this.abilityModifiers()); }

  getScoreFor(name: string): number | undefined {
    return this.abilityScores()!.find(score => score.name === name)?.value;
  }
}
