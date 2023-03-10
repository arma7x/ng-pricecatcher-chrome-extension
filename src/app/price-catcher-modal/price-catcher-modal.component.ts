import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemRow, PriceRow, SubmitRegionTreeFormEvent } from '../types';

@Component({
  selector: 'app-price-catcher-modal',
  templateUrl: './price-catcher-modal.component.html',
  styleUrls: ['./price-catcher-modal.component.scss']
})
export class PriceCatcherModalComponent implements OnInit {

  @Input() db: any;
  @Input() regionTree: { [key: string]: { [key: string]: Array<string>; }; } = {};
  item!: ItemRow | null;
  priceList: Array<PriceRow> = [];
  visibility: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public showModal(item: ItemRow) {
    this.item = item;
    this.visibility = true;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  public hideModal() {
    this.visibility = false;
    this.item = null;
    this.priceList = [];
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  stopPropagation(evt: any) {
    evt.stopPropagation();
  }

  getPriceList(evt: SubmitRegionTreeFormEvent): void {
    if (this.item == null)
      return;
    let item_code = this.item.item_code;
    let state = evt.state;
    let district = evt.district;
    let premise_type = evt.premise_type;
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

    this.priceList = [];
    setTimeout(() => {
      const result = this.db.exec([select_stmt, join_stmt.join(" "), where_stmt.join(" AND "), order_stmt].join(' '));
      let tempPriceList: Array<PriceRow> = [];
      if (result.length > 0) {
        result[0].values.forEach((row: any[]) => {
          let temp: { [key: string]: any } = {};
          result[0].columns.forEach((key: any, index: number) => {
            temp[key] = row[index];
          });
          tempPriceList.push(temp as PriceRow);
        });
      }
      this.priceList = [...tempPriceList];
    }, 200);
  }

}
