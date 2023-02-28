import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCategoryFormComponent } from './group-category-form.component';

describe('GroupCategoryFormComponent', () => {
  let component: GroupCategoryFormComponent;
  let fixture: ComponentFixture<GroupCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
