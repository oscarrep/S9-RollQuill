import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaceFormComponent } from './race-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('RaceFormComponent', () => {
  let component: RaceFormComponent;
  let fixture: ComponentFixture<RaceFormComponent>;

  const mockRaces = [
    {
      name: 'Elf',
      speed: 30,
      languages: [{ index: 'Common' }, { index: 'Elvish' }],
      ability_bonuses: [
        { ability_score: { name: 'DEX' }, bonus: 2 },
        { ability_score: { name: 'INT' }, bonus: 1 },
      ],
      subraces: [{ name: 'High Elf' }, { name: 'Wood Elf' }]
    },
    {
      name: 'Human',
      speed: 30,
      languages: [{ index: 'Common' }],
      ability_bonuses: [{ ability_score: { name: 'ALL' }, bonus: 1 }],
      subraces: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceFormComponent, CommonModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RaceFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      race: new FormControl(''),
      subrace: new FormControl(''),
      speed: new FormControl(null),
      ability_bonuses: new FormControl([]),
    });

    component.raceData = mockRaces;
    component.isInvalid = () => false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate subraces and emit selectedRace when race is selected', () => {
    const spy = jest.spyOn(component.selectedRaceChange, 'emit');
  
    // Manually trigger ngOnChanges to simulate @Input() update
    component.ngOnChanges({
      form: {
        currentValue: component.form,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      }
    });
  
    component.form.get('race')?.setValue('Elf');
    fixture.detectChanges();
  
    expect(component.selectedRace?.name).toBe('Elf');
    expect(component.subraces).toEqual(['High Elf', 'Wood Elf']);
  
    const subraceControl = component.form.get('subrace');
    expect(subraceControl?.validator).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ name: 'Elf' }));
  });

  it('should clear subrace and remove validator if no subraces exist', () => {
    component.ngOnChanges({
      form: {
        currentValue: component.form,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      }
    });
  
    component.form.get('race')?.setValue('Human');
    fixture.detectChanges();
  
    expect(component.selectedRace?.name).toBe('Human');
    expect(component.subraces.length).toBe(0);
  
    const subraceControl = component.form.get('subrace');
    expect(subraceControl?.validator).toBeNull();
    expect(subraceControl?.value).toBe('');
  });

  it('should set default subrace if only one subrace exists', () => {
    component.raceData = [
      {
        name: 'Dwarf',
        speed: 25,
        languages: [{ index: 'Common' }, { index: 'Dwarvish' }],
        ability_bonuses: [{ ability_score: { name: 'CON' }, bonus: 2 }],
        subraces: [{ name: 'Hill Dwarf' }]
      }
    ];
    component.ngOnChanges({
      form: { currentValue: component.form, previousValue: null, firstChange: true, isFirstChange: () => true }
    });
    component.form.get('race')?.setValue('Dwarf');
    fixture.detectChanges();

    expect(component.subraces).toEqual(['Hill Dwarf']);
    expect(component.form.get('subrace')?.value).toBe('Hill Dwarf');
  });

  it('should not fail if selected race is not found in raceData', () => {
    component.form.get('race')?.setValue('Dragonborn');
    fixture.detectChanges();

    expect(component.selectedRace).toBeUndefined();
    expect(component.subraces).toEqual([]);
  });
});
