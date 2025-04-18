import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCharacterComponent } from './section-character.component';

describe('SectionCharacterComponent', () => {
  let component: SectionCharacterComponent;
  let fixture: ComponentFixture<SectionCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
