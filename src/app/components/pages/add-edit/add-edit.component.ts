import { Component, inject, Input } from '@angular/core';
import { CharacterFormComponent } from './forms/character-form/character-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CharacterFormComponent],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {
  @Input() character: Character | null = null;
  @Input() isEditMode: boolean = false;

}