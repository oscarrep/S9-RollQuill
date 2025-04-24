import { Component, Input } from '@angular/core';
import { CharacterFormComponent } from './forms/character-form/character-form.component';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CharacterFormComponent],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {
  @Input() formType!: 'character';
  @Input() data: any = null;
}