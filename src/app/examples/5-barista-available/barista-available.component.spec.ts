import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaristaAvailableComponent} from './barista-available.component';

describe('BaristaAvailableComponent', () => {
  let component: BaristaAvailableComponent;
  let fixture: ComponentFixture<BaristaAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaristaAvailableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaristaAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
