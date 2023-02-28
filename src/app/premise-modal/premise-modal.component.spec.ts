import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseModalComponent } from './premise-modal.component';

describe('PremiseModalComponent', () => {
  let component: PremiseModalComponent;
  let fixture: ComponentFixture<PremiseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
