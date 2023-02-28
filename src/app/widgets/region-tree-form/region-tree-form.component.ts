import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-region-tree-form',
  templateUrl: './region-tree-form.component.html',
  styleUrls: ['./region-tree-form.component.scss']
})
export class RegionTreeFormComponent implements OnInit {

  @Input() regionTree: { [key: string]: { [key: string]: Array<string>; }; } = {};
  @Output() onSubmit = new EventEmitter();

  regionTreeForm = this.formBuilder.group({
    state: '',
    district: '',
    premise_type: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onChangeState(evt: EventTarget | null): void {
    this.regionTreeForm.controls['district'].setValue('');
    this.regionTreeForm.controls['premise_type'].setValue('');
  }

  onChangeDistrict(evt: EventTarget | null): void {
    this.regionTreeForm.controls['premise_type'].setValue('');
  }

}
