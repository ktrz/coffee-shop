import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignBaristaComponent} from './assign-barista.component';

describe('BaristaAvailableComponent', () => {
  let component: AssignBaristaComponent;
  let fixture: ComponentFixture<AssignBaristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignBaristaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBaristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
