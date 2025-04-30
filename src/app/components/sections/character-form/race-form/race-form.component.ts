import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-race-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './race-form.component.html',
  styleUrl: './race-form.component.scss'
})
export class RaceFormComponent {
  @Input() form!: FormGroup;
  @Input() submitted: boolean = false;
  @Input() raceData: any[] = [];
  @Input() raceNames: string[] = [];
  @Input() selectedRace!: any;
  @Input() subraces: string[] = [];
  @Input() isInvalid!: (controlName: string) => boolean;
  @Output() raceChanged = new EventEmitter<void>();
  @Output() selectedRaceChange = new EventEmitter<any>();

  private raceSubscription: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] && this.form) {
      if (this.raceSubscription) {
        this.raceSubscription.unsubscribe();
      }

      this.raceSubscription = this.form.get('race')?.valueChanges.subscribe(raceName => {
        const selected = this.raceData.find(race => race.name === raceName);
        this.selectedRace = { ...selected };
        this.subraces = selected?.subraces?.map((sr: any) => sr.name) || [];
        this.form.patchValue({ subrace: '' });
        this.selectedRaceChange.emit(this.selectedRace);
        console.log('[RaceFormComponent] Race selected:', this.selectedRace);
      });
    }
  }
}