import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgModalComponent } from './img-modal.component';

describe('ImgModalComponent', () => {
  let component: ImgModalComponent;
  let fixture: ComponentFixture<ImgModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
