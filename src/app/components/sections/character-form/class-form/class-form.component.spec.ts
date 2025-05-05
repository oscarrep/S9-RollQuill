import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassFormComponent } from './class-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SkillCheckboxComponent } from '../../../../shared/skill-checkbox/skill-checkbox.component';
import { CommonModule } from '@angular/common';

describe('ClassFormComponent (Jest)', () => {
  let component: ClassFormComponent;
  let fixture: ComponentFixture<ClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassFormComponent, ReactiveFormsModule, CommonModule, SkillCheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      class: new FormControl(''),
      subclass: new FormControl(''),
      classSkills: new FormControl([]),
      backgroundSkills: new FormControl([]),
      savingThrows: new FormControl([]),
    });

    component.classNames = ['Fighter', 'Wizard'];
    component.classData = [{
      name: 'Fighter',
      subclasses: [{ name: 'Champion' }],
      proficiency_choices: [{ skills: ['Athletics', 'Survival'] }],
      saving_throws: [{ name: 'Strength' }, { name: 'Constitution' }],
      skillChoose: 2,
    }];
    component.isInvalid = () => false;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should update subclasses and skills on class change', () => {
    component.ngOnChanges({
      form: {
        currentValue: component.form,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    component.form.get('class')?.setValue('Fighter');
    fixture.detectChanges();

    expect(component.subclasses).toEqual(['Champion']);
    expect(component.skills).toEqual(['Athletics', 'Survival']);
    expect(component.selectedClass.name).toBe('Fighter');
    expect(component.form.get('savingThrows')?.value).toEqual(['Strength', 'Constitution']);
  });

  it('should toggle skill correctly (add)', () => {
    component.selectedClass = { skillChoose: 2 };
    component.form.patchValue({ classSkills: [] });

    component.toggleClassSkill('Athletics', true);
    expect(component.form.value.classSkills).toEqual(['Athletics']);
  });

  it('should toggle skill correctly (remove)', () => {
    component.selectedClass = { skillChoose: 2 };
    component.form.patchValue({ classSkills: ['Athletics'] });

    component.toggleClassSkill('Athletics', false);
    expect(component.form.value.classSkills).toEqual([]);
  });

  it('should disable skill when max reached', () => {
    component.selectedClass = { skillChoose: 1 };
    component.form.patchValue({ classSkills: ['Athletics'], backgroundSkills: [] });

    expect(component.isClassSkillDisabled('Survival')).toBe(true);
  });

  it('should disable skill if it is a background skill', () => {
    component.selectedClass = { skillChoose: 2 };
    component.form.patchValue({ classSkills: [], backgroundSkills: ['Athletics'] });

    expect(component.isClassSkillDisabled('Athletics')).toBe(true);
  });
});
