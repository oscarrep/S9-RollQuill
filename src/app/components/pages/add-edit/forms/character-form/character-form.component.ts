import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class CharacterFormComponent {
  @Input() data: any;
  @Output() save = new EventEmitter<any>();

  form = {
    name: '',
    level: 1,
  };

  ngOnInit() {
    if (this.data) {
      this.form = { ...this.data };
    }
  }

  submitForm() {
    this.save.emit(this.form);
  }
}