import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignBaristaReducedStateComponent} from './assign-barista-reduced-state.component';

describe('BaristaAvailableComponent', () => {
  let component: AssignBaristaReducedStateComponent;
  let fixture: ComponentFixture<AssignBaristaReducedStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignBaristaReducedStateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBaristaReducedStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
