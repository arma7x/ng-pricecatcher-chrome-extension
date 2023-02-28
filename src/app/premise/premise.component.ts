import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { SubmitRegionTreeFormEvent, PremiseRow } from '../types';

@Component({
  selector: 'app-premise',
  templateUrl: './premise.component.html',
  styleUrls: ['./premise.component.scss']
})
export class PremiseComponent implements OnInit {

  db: any;
  premises: Array<PremiseRow> = [];
  itemGroup: Array<string> = [];
  itemCategory: Array<string> = [];
  regionTree: { [key: string]: { [key: string]: Array<string>; }; } = {};

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

  showItemList(premise: PremiseRow) {
    console.log(premise);
  }

  async getPremises(evt: SubmitRegionTreeFormEvent) {
    let select_stmt = "SELECT * from premises";
    let where_stmt = ["WHERE NOT premise_code=-1"];
    if (evt.state != null && evt.state != "") {
      where_stmt.push(`premises.state='${evt.state}'`);
    }
    if (evt.district != null && evt.district != "") {
      where_stmt.push(`premises.district='${evt.district}'`);
    }
    if (evt.premise_type != null && evt.premise_type != "") {
      where_stmt.push(`premises.premise_type='${evt.premise_type}'`);
    }
    let order_stmt = "ORDER BY state ASC, district ASC, premise_type ASC";

    this.premises = [];
    setTimeout(() => {
      let tempPremises: Array<PremiseRow> = [];
      const result = this.db.exec([select_stmt, where_stmt.join(" AND "), order_stmt].join(' '));
      if (result.length > 0) {
        result[0].values.forEach((row: any[]) => {
          let temp: { [key: string]: any } = {};
          result[0].columns.forEach((key: any, index: number) => {
            temp[key] = row[index];
          });
          tempPremises.push(temp as PremiseRow);
        });
      }
      this.premises = [...tempPremises];
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
