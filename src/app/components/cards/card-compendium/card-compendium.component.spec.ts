import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCompendiumComponent } from './card-compendium.component';

describe('CardCompendiumComponent', () => {
  let component: CardCompendiumComponent;
  let fixture: ComponentFixture<CardCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCompendiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
