import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { HpModalComponent } from './hp-modal/hp-modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render HpModalComponent when type is "hp"', () => {
    component.type = 'hp';
    component.currentHp = 30;
    component.maxHp = 100;
    component.characterId = 'xyz123';
    fixture.detectChanges();

    const hpModal = fixture.debugElement.query(By.directive(HpModalComponent));
    expect(hpModal).toBeTruthy();
  });

  it('should pass correct inputs to HpModalComponent', () => {
    component.type = 'hp';
    component.currentHp = 45;
    component.maxHp = 100;
    component.characterId = 'char456';
    fixture.detectChanges();

    const hpModal = fixture.debugElement.query(By.directive(HpModalComponent));
    expect(hpModal.componentInstance.currentHp).toBe(45);
    expect(hpModal.componentInstance.maxHp).toBe(100);
    expect(hpModal.componentInstance.characterId).toBe('char456');
  });

  it('should emit hpUpdated when HpModalComponent emits updated', () => {
    component.type = 'hp';
    fixture.detectChanges();

    jest.spyOn(component.hpUpdated, 'emit');
    const hpModal = fixture.debugElement.query(By.directive(HpModalComponent));
    hpModal.componentInstance.updated.emit(80);

    expect(component.hpUpdated.emit).toHaveBeenCalledWith(80);
  });

  it('should emit closed when HpModalComponent emits onClose', () => {
    component.type = 'hp';
    fixture.detectChanges();

    jest.spyOn(component.closed, 'emit');
    const hpModal = fixture.debugElement.query(By.directive(HpModalComponent));
    hpModal.componentInstance.onClose.emit();

    expect(component.closed.emit).toHaveBeenCalled();
  });
});
