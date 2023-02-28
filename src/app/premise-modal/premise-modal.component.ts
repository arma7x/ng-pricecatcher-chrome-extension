import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PremiseRow, ProductRow, SubmitGroupCategoryFormEvent } from '../types';

@Component({
  selector: 'app-premise-modal',
  templateUrl: './premise-modal.component.html',
  styleUrls: ['./premise-modal.component.scss']
})
export class PremiseModalComponent implements OnInit {

  @Input() db: any;
  @Input() itemGroup: Array<string> = [];
  @Input() itemCategory: Array<string> = [];
  premise!: PremiseRow | null;
  productList: Array<ProductRow> = [];
  visibility: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public showModal(premise: PremiseRow) {
    this.premise = premise;
    this.visibility = true;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  public hideModal() {
    this.visibility = false;
    this.premise = null;
    this.productList = [];
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  stopPropagation(evt: any) {
    evt.stopPropagation();
  }

  getProductList(evt: SubmitGroupCategoryFormEvent): void {
    if (this.premise == null)
      return;
    let select_stmt = "SELECT items.*, prices.date as last_update, prices.price FROM items";
    let join_stmt = ["LEFT JOIN prices ON prices.item_code = items.item_code", "LEFT JOIN premises ON premises.premise_code = prices.premise_code"];
    let where_stmt = ["WHERE NOT items.item_code=-1", " prices.price IS NOT NULL", `premises.premise_code=${this.premise.premise_code}`];
    if (evt.item_group != "") {
      where_stmt.push(`items.item_group='${evt.item_group}'`);
    }
    if (evt.item_category != "") {
      where_stmt.push(`items.item_category='${evt.item_category}'`);
    }
    let order_stmt = "ORDER BY prices.price ASC";

    this.productList = [];
    setTimeout(() => {
      const result = this.db.exec([select_stmt, join_stmt.join(' '), where_stmt.join(" AND "), order_stmt].join(' '));
      let tempProductList: Array<ProductRow> = [];
      if (result.length > 0) {
        result[0].values.forEach((row: any[]) => {
          let temp: { [key: string]: any } = {};
          result[0].columns.forEach((key: any, index: number) => {
            temp[key] = row[index];
          });
          tempProductList.push(temp as ProductRow);
        });
      }
      this.productList = [...tempProductList];
    }, 200);
  }

}
