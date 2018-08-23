import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoffeeItemComponent} from './coffee-item.component';

describe('CoffeeItemComponent', () => {
  let component: CoffeeItemComponent;
  let fixture: ComponentFixture<CoffeeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoffeeItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
