import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCatcherComponent } from './pricecatcher.component';

describe('PriceCatcherComponent', () => {
  let component: PriceCatcherComponent;
  let fixture: ComponentFixture<PriceCatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
