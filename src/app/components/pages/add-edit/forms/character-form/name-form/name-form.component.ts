import { Component, inject, Input } from '@angular/core';
import { InputComponent } from '../../../../../../shared/input/input.component';
import { FormValidationService } from '../../../../../../services/form-validation.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-form',
  imports: [InputComponent, ReactiveFormsModule, CommonModule],
  standalone:true,
  templateUrl: './name-form.component.html',
  styleUrl: './name-form.component.scss'
})
export class NameFormComponent {
  _formValidation = inject(FormValidationService);

  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() submitted: boolean = false;


  isInvalid(): boolean {
    return this._formValidation.isInvalid(
      this.form,
      this.controlName,
      this.submitted,
    );
  }

}
