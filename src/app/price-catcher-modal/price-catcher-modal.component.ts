import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-price-catcher-modal',
  templateUrl: './price-catcher-modal.component.html',
  styleUrls: ['./price-catcher-modal.component.scss']
})
export class PriceCatcherModalComponent implements OnInit {

  @Input() db: any;
  @Input() statesTree: { [key: string]: { [key: string]: Array<string>; }; } = {};
  item: any;
  visibility: boolean = false;

  statesTreeForm = this.formBuilder.group({
    state: '',
    district: '',
    premise_type: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public showModal(item: any) {
    this.item = item;
    this.visibility = true;
  }

  public hideModal() {
    this.visibility = false;
    this.item = null;
  }

  onChangeState(evt: EventTarget | null): void {
    this.statesTreeForm.controls['district'].setValue('');
    this.statesTreeForm.controls['premise_type'].setValue('');
  }

  onChangeDistrict(evt: EventTarget | null): void {
    this.statesTreeForm.controls['premise_type'].setValue('');
  }

  getPriceList(): void {
    if (this.item == null)
      return;
    let item_code = this.item.item_code;
    let state = this.statesTreeForm.value.state;
    let district = this.statesTreeForm.value.district;
    let premise_type = this.statesTreeForm.value.premise_type;
    let select_stmt = "SELECT prices.date as last_update, prices.price, premises.* FROM items";
    let join_stmt = ["LEFT JOIN prices ON prices.item_code = items.item_code", "LEFT JOIN premises ON premises.premise_code = prices.premise_code"];
    var where_stmt = ["WHERE NOT items.item_code=-1", "prices.price IS NOT NULL", "premises.premise_code IS NOT NULL", `items.item_code=${item_code}`];
    if (state != null && state != "") {
      where_stmt.push(`premises.state='${state}'`);
    }
    if (district != null && district != "") {
      where_stmt.push(`premises.district='${district}'`);
    }
    if (premise_type != null && premise_type != "") {
      where_stmt.push(`premises.premise_type='${premise_type}'`);
    }
    let order_stmt = "ORDER BY prices.price ASC";
    const result = this.db.exec([select_stmt, join_stmt.join(" "), where_stmt.join(" AND "), order_stmt].join(' '));
    console.log();
    console.log(this.item, result[0].values);
  }

}
