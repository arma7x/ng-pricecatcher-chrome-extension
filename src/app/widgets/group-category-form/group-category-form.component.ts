import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-group-category-form',
  templateUrl: './group-category-form.component.html',
  styleUrls: ['./group-category-form.component.scss']
})
export class GroupCategoryFormComponent implements OnInit {

  @Input() itemGroup: Array<string> = [];
  @Input() itemCategory: Array<string> = [];
  @Output() onSubmit = new EventEmitter();

  groupCategoryForm = this.formBuilder.group({
    item_group: '',
    item_category: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
