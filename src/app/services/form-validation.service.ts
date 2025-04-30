import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  isInvalid(form: FormGroup, controlName: string, submitted: boolean, extraConditions?: () => boolean): boolean {
    const control: AbstractControl | null = form.get(controlName);
    if (!control) return false;

    if (extraConditions && !extraConditions()) {
      return false;
    }

    return control.invalid && (control.touched || submitted);
  }
}