import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTreeFormComponent } from './region-tree-form.component';

describe('RegionTreeFormComponent', () => {
  let component: RegionTreeFormComponent;
  let fixture: ComponentFixture<RegionTreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionTreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionTreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
