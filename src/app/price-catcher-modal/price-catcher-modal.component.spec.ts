import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCatcherModalComponent } from './price-catcher-modal.component';

describe('PriceCatcherModalComponent', () => {
  let component: PriceCatcherModalComponent;
  let fixture: ComponentFixture<PriceCatcherModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCatcherModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCatcherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
