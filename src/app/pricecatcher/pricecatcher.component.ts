import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { SubmitGroupCategoryFormEvent, ItemRow } from '../types';

@Component({
  selector: 'app-pricecatcher',
  templateUrl: './pricecatcher.component.html',
  styleUrls: ['./pricecatcher.component.scss']
})
export class PriceCatcherComponent implements OnInit {

  db: any;
  items: Array<ItemRow> = [];
  itemGroup: Array<string> = [];
  itemCategory: Array<string> = [];
  regionTree: { [key: string]: { [key: string]: Array<string>; }; } = {};
  @ViewChild('refPriceCatcherModal') refPriceCatcherModal: any;

  constructor(private zone: NgZone, private router: Router, private database: DatabaseService) { }

  ngOnInit(): void {
    chrome.runtime.onMessage.addListener((evt) => {
      if (evt.type != null && evt.type == "ROUTE" && evt.path != null) {
        this.zone.run(() => {
          this.router.navigate([evt.path]);
        });
      }
    });
    this.initialize();
  }

  showPriceList(item: ItemRow) {
    this.refPriceCatcherModal.showModal(item);
  }

  filterItems(evt: SubmitGroupCategoryFormEvent): void {
    let select_stmt = "SELECT * FROM items";
    let where_stmt = ["WHERE NOT item_code=-1"];
    if (evt.item_group != null && evt.item_group != "") {
      where_stmt.push(`item_group='${evt.item_group}'`);
    }
    if (evt.item_category != null && evt.item_category != "") {
      where_stmt.push(`item_category='${evt.item_category}'`);
    }

    this.items = [];
    setTimeout(() => {
      let tempItems: Array<ItemRow> = [];
      const result = this.db.exec([select_stmt, where_stmt.join(" AND ")].join(' '));
      if (result.length > 0) {
        result[0].values.forEach((row: any[]) => {
          let temp: { [key: string]: any } = {};
          result[0].columns.forEach((key: any, index: number) => {
            temp[key] = row[index];
          });
          tempItems.push(temp as ItemRow);
        });
      }
      this.items = [...tempItems];
    }, 200);
  }

  async initialize() {
    try {
      this.db = await this.database.instance.init();

      const item_group = this.db.exec("SELECT item_group FROM items WHERE NOT item_code=-1 GROUP BY item_group;");
      this.itemGroup = item_group[0].values.flat();

      const item_category = this.db.exec("SELECT item_category FROM items WHERE NOT item_code=-1 GROUP BY item_category;");
      this.itemCategory = item_category[0].values.flat();

      const states = this.db.exec("SELECT state, district, premise_type FROM premises WHERE NOT premise_code=-1 GROUP BY state, district, premise_type ORDER BY state ASC, district ASC, premise_type ASC;");
      for (let key in states[0].values) {
        let [state, district, type] = states[0].values[key];
        if (this.regionTree[state] == null)
          this.regionTree[state] = {};
        if (this.regionTree[state][district] == null)
          this.regionTree[state][district] = [];
        if (this.regionTree[state][district].indexOf(type) < 0)
          this.regionTree[state][district].push(type);
      }

    } catch (err) {
      console.log(err);
    }
  }

}
