import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCheckboxComponent } from './skill-checkbox.component';

describe('SkillCheckboxComponent', () => {
  let component: SkillCheckboxComponent;
  let fixture: ComponentFixture<SkillCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
