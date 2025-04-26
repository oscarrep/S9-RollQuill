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

  private fb = inject(FormBuilder);
  private _apiService = inject(ApiService);

  form: FormGroup=this.fb.group({
    name: ['', Validators.required],
    race: ['', Validators.required],
    subrace: [''],
    class: ['', Validators.required],
    subclass: [''],
    skills: [[]],
    expertise: [[]],
    level: [1],
    savingThrows: [[]],
  })

  onSubmit(){
    if(this.form.valid){
      console.log('Chracter created', this.form.value);
      this._apiService.saveCharacter(this.form.value);
    }

  }
}