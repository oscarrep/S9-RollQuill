import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpModalComponent } from './hp-modal.component';

describe('HpModalComponent', () => {
  let component: HpModalComponent;
  let fixture: ComponentFixture<HpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
