import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoffeeMadeAndPickedComponent} from './coffee-made-and-picked.component';

describe('BaristaAvailableComponent', () => {
  let component: CoffeeMadeAndPickedComponent;
  let fixture: ComponentFixture<CoffeeMadeAndPickedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoffeeMadeAndPickedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeMadeAndPickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
