import { Component, computed, inject, input, signal } from '@angular/core';
import { BoxComponent } from '../../../../../shared/box/box.component';
import { REVERSE_STAT_NAME_MAP } from '../../../../../shared/stat-map';
import { DndJsonService } from '../../../../../services/dnd-json.service';

@Component({
  selector: 'app-stat-row',
  imports: [BoxComponent],
  standalone:true,
  templateUrl: './stat-row.component.html',
  styleUrl: './stat-row.component.scss'
})
export class StatRowComponent {
  abilityScores = input<{ name: string; value: number }[]>();
  localScores = signal<{ name: string; short: string; value: number; desc: string[]; modifier: number }[]>([]);
  abilityModifiers = input<{ name: string; value: number }[]>();
  proficiencies = input<string[]>()
  savingThrows = input<string>()
  proficiencyBonus = input<number>()
  _dndJsonService = inject(DndJsonService)

  ngOnInit() {
    this._dndJsonService.getAbilityScores().subscribe(jsonScores => {
      this.localScores.set(
        this.abilityScores()!.map(score => {
          const mod = this.abilityModifiers()!.find(mod => mod.name === score.name);
          const desc = jsonScores.find(js => js.full === score.name)?.desc ?? [];
          const short = REVERSE_STAT_NAME_MAP[score.name] || '';
          return {
            ...score,
            modifier: mod!.value!,
            desc,
            short
          };
        })
      );
    });
  }

  getScoreFor(name: string): number | undefined {
    return this.abilityScores()!.find(score => score.name === name)?.value;
  }

  checkProficiency(proficiencies: string[], shortName: string): boolean {
    return proficiencies.includes(shortName);
  }
}