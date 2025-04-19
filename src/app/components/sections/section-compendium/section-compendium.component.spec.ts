import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCompendiumComponent } from './section-copendium.component';

describe('SectionCompendiumComponent', () => {
  let component: SectionCompendiumComponent;
  let fixture: ComponentFixture<SectionCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCompendiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
