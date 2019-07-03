import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListTestComponent } from './event-list-test.component';

describe('EventListTestComponent', () => {
  let component: EventListTestComponent;
  let fixture: ComponentFixture<EventListTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
