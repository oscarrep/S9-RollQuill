import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathCheckboxComponent } from './death-checkbox.component';

describe('DeathCheckboxComponent', () => {
  let component: DeathCheckboxComponent;
  let fixture: ComponentFixture<DeathCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
