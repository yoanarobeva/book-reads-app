import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentReadCardComponent } from './current-read-card.component';

describe('CurrentReadCardComponent', () => {
  let component: CurrentReadCardComponent;
  let fixture: ComponentFixture<CurrentReadCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentReadCardComponent]
    });
    fixture = TestBed.createComponent(CurrentReadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
