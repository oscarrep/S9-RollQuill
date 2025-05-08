import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFooterComponent } from './character-footer.component';

describe('CharacterFooterComponent', () => {
  let component: CharacterFooterComponent;
  let fixture: ComponentFixture<CharacterFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
