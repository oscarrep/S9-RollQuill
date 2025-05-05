import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCharacterComponent } from './card-character.component';
import { CommonModule } from '@angular/common';
import { Character } from '../../../interfaces/character';
import { MockNavigateService } from '../../../../_mocks/mocknavigate.service';

describe('CardCharacterComponent', () => {
  let component: CardCharacterComponent;
  let fixture: ComponentFixture<CardCharacterComponent>;
  let mockNavigateService: MockNavigateService;

  beforeEach(async () => {
    mockNavigateService = new MockNavigateService();

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CardCharacterComponent],
      providers: [{ provide: MockNavigateService, useValue: mockNavigateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CardCharacterComponent);
    component = fixture.componentInstance;

    component.character = {
      createdBy: 'TestUser',
      name: 'Test',
      class: 'Wizard',
      level: 1,
      race: 'Elf',
      subrace: 'High Elf',
      subclass: 'Evocation',
      speed: 30,
      ability_bonuses: [{ name: 'DEX', value: 2 }],

      ability_scores: {
        STR: [{ name: 'Strength', value: 8 }],
        DEX: [{ name: 'Dexterity', value: 14 }],
        CON: [{ name: 'Constitution', value: 12 }],
        INT: [{ name: 'Intelligence', value: 15 }],
        WIS: [{ name: 'Wisdom', value: 13 }],
        CHA: [{ name: 'Charisma', value: 10 }]
      },

      savingThrows: ['WIS', 'INT'],
      classSkills: ['Investigation', 'History'],
      backgroundSkills: ['Arcana', 'Perception'],
      expertise: [''],
    } as Character;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test');
  });

  it('should navigate when clicked', () => {
    const card = fixture.nativeElement.querySelector('.card');
    card.click();
    expect(mockNavigateService.navigateTo).toHaveBeenCalledWith('TestUser/character/undefined');
  });
});