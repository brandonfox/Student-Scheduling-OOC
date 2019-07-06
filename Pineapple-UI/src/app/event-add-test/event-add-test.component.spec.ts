import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddTestComponent } from './event-add-test.component';

describe('EventAddTestComponent', () => {
  let component: EventAddTestComponent;
  let fixture: ComponentFixture<EventAddTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAddTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
