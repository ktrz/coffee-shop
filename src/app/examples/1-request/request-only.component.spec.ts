import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestOnlyComponent} from './request-only.component';

describe('RequestOnlyComponent', () => {
  let component: RequestOnlyComponent;
  let fixture: ComponentFixture<RequestOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestOnlyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
