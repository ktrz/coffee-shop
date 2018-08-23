import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoffeeItemsComponent} from './coffee-items.component';

describe('CoffeeItemsComponent', () => {
  let component: CoffeeItemsComponent;
  let fixture: ComponentFixture<CoffeeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoffeeItemsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
