import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentCardComponent } from './user-current-card.component';

describe('UserCurrentCardComponent', () => {
  let component: UserCurrentCardComponent;
  let fixture: ComponentFixture<UserCurrentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCurrentCardComponent]
    });
    fixture = TestBed.createComponent(UserCurrentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
