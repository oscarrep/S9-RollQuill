import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HpModalComponent } from './hp-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { InputComponent } from '../../input/input.component';
import { By } from '@angular/platform-browser';

describe('HpEditModalComponent', () => {
  let component: HpModalComponent;
  let fixture: ComponentFixture<HpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HpModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HpModalComponent);
    component = fixture.componentInstance;
    component.currentHp = 50;
    component.maxHp = 100;
    component.characterId = 'abc123';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize hp with currentHp input', () => {
    expect(component.hp).toBe(50);
  });

  it('should increase HP by 5 when "+5" button is clicked', () => {
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[4];
    btn.triggerEventHandler('buttonClick', null);
    fixture.detectChanges();
    expect(component.hp).toBe(55);
  });

  it('should decrease HP by 10 when "-10" button is clicked', () => {
    const btn = fixture.debugElement.queryAll(By.css('app-button'))[0]; 
    btn.triggerEventHandler('buttonClick', null);
    fixture.detectChanges();
    expect(component.hp).toBe(40);
  });

  it('should emit updated event when apply() is called', () => {
    jest.spyOn(component.updated, 'emit');
    component.hp = 60;
    component.apply();
    expect(component.updated.emit).toHaveBeenCalledWith(60);
  });

  it('should emit onClose event when close() is called', () => {
    jest.spyOn(component.onClose, 'emit');
    component.close();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should update hp on manual input', () => {
    const inputElement = document.createElement('input');
    inputElement.value = '77';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    component.onHpInput(event);
    expect(component.hp).toBe(77);
  });

  it('should set hp to 0 if invalid input entered', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'abc';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    component.onHpInput(event);
    expect(component.hp).toBe(0);
  });
});
