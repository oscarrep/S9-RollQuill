import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NameFormComponent } from './name-form.component';
import { InputComponent } from '../../../../shared/input/input.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../../../../services/form-validation.service';
import { CommonModule } from '@angular/common';

describe('NameFormComponent (Jest)', () => {
  let component: NameFormComponent;
  let fixture: ComponentFixture<NameFormComponent>;
  let mockValidationService: jest.Mocked<FormValidationService>;

  beforeEach(async () => {
    mockValidationService = {
      isInvalid: jest.fn()
    } as jest.Mocked<FormValidationService>;

    await TestBed.configureTestingModule({
      imports: [NameFormComponent, ReactiveFormsModule, InputComponent, CommonModule],
      providers: [{ provide: FormValidationService, useValue: mockValidationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NameFormComponent);
    component = fixture.componentInstance;

    component.controlName = 'name';
    component.submitted = false;
    component.form = new FormGroup({
      name: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should render app-input with correct attributes', () => {
    const inputEl: HTMLElement = fixture.nativeElement.querySelector('app-input');
    expect(inputEl).toBeTruthy();
  });

  it('should call isInvalid from FormValidationService with correct params', () => {
    mockValidationService.isInvalid.mockReturnValue(true);
    const result = component.isInvalid();

    expect(result).toBe(true);
    expect(mockValidationService.isInvalid).toHaveBeenCalledWith(
      component.form,
      'name',
      false
    );
  });
});
