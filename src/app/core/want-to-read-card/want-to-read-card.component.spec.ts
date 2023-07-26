import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToReadCardComponent } from './want-to-read-card.component';

describe('WantToReadCardComponent', () => {
  let component: WantToReadCardComponent;
  let fixture: ComponentFixture<WantToReadCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WantToReadCardComponent]
    });
    fixture = TestBed.createComponent(WantToReadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
