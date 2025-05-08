import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillCheckboxComponent } from './skill-checkbox.component';
import { By } from '@angular/platform-browser';

describe('SkillCheckboxComponent', () => {
  let component: SkillCheckboxComponent;
  let fixture: ComponentFixture<SkillCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect checked and disabled attributes correctly', () => {
    component.checked = true;
    component.disabled = true;
    component.skill = 'Perception';
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();
    expect(checkbox.disabled).toBeTruthy();
    expect(checkbox.value).toBe('Perception');
  });

  it('should display the skill name next to the checkbox', () => {
    component.skill = 'Stealth';
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(label.textContent.trim()).toBe('Stealth');
  });

  it('should emit skillToggled on checkbox change', () => {
    component.skill = 'Athletics';
    fixture.detectChanges();

    const spy = jest.spyOn(component.skillToggled, 'emit');

    const checkbox = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith({ skill: 'Athletics', checked: true });
  });
});
