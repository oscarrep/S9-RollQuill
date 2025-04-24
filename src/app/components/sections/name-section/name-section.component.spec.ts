import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSectionComponent } from './name-section.component';

describe('NameSectionComponent', () => {
  let component: NameSectionComponent;
  let fixture: ComponentFixture<NameSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
