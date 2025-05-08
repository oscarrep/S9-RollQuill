import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsFormComponent } from './skills-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent;
  let fixture: ComponentFixture<SkillsFormComponent>;
  const fb = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsFormComponent);
    component = fixture.componentInstance;

    component.skillData = [
      { name: 'Athletics' },
      { name: 'Stealth' },
      { name: 'Arcana' }
    ];

    component.form = fb.group({
      backgroundSkills: [[]],
      classSkills: [[]]
    });

    fixture.detectChanges();
  });

  it('should render checkboxes for each skill', () => {
    const checkboxes = fixture.nativeElement.querySelectorAll('app-skill-checkbox');
    expect(checkboxes.length).toBe(3);
  });

  it('should mark a skill as checked if in backgroundSkills', () => {
    component.form.patchValue({ backgroundSkills: ['Athletics'] });
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('app-skill-checkbox');
    expect(checkbox.getAttribute('ng-reflect-checked')).toBe('true');
  });

  it('should disable unselected skills if 2 are already selected', () => {
    component.form.patchValue({ backgroundSkills: ['Athletics', 'Stealth'] });
    fixture.detectChanges();

    const checkboxes = fixture.nativeElement.querySelectorAll('app-skill-checkbox');
    const thirdCheckbox = checkboxes[2];
    expect(thirdCheckbox.getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should add skill to form when toggled on and under limit', () => {
    component.toggleBackgroundSkill('Arcana', true);
    expect(component.form.value.backgroundSkills).toContain('Arcana');
  });

  it('should not add skill if already 2 selected', () => {
    component.form.patchValue({ backgroundSkills: ['Athletics', 'Stealth'] });
    fixture.detectChanges();

    component.toggleBackgroundSkill('Arcana', true);
    expect(component.form.value.backgroundSkills).not.toContain('Arcana');
  });

  it('should remove skill from form when toggled off', () => {
    component.form.patchValue({ backgroundSkills: ['Athletics', 'Arcana'] });
    component.toggleBackgroundSkill('Arcana', false);
    expect(component.form.value.backgroundSkills).not.toContain('Arcana');
  });
})