import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-pricecatcher',
  templateUrl: './pricecatcher.component.html',
  styleUrls: ['./pricecatcher.component.scss']
})
export class PriceCatcherComponent implements OnInit {

  itemGroup: Array<string> = [];
  itemCategory: Array<string> = [];
  statesTree: { [key: string]: { [key: string]: Array<string>; }; } = {};

  constructor(private zone: NgZone, private router: Router, private database: DatabaseService) { }

  ngOnInit(): void {
    chrome.runtime.onMessage.addListener((evt) => {
      if (evt.type != null && evt.type == "ROUTE" && evt.path != null) {
        this.zone.run(() => {
          this.router.navigate([evt.path]);
        });
      }
    });
  }

  public async getItems() {
    try {
      const db = await this.database.instance.init();

      const item_group = db.exec("SELECT item_group FROM items WHERE NOT item_code=-1 GROUP BY item_group;");
      this.itemGroup = item_group[0].values.flat();

      const item_category = db.exec("SELECT item_category FROM items WHERE NOT item_code=-1 GROUP BY item_category;");
      this.itemCategory = item_category[0].values.flat();

      const states = db.exec("SELECT state, district, premise_type FROM premises WHERE NOT premise_code=-1 GROUP BY state, district, premise_type ORDER BY state ASC, district ASC, premise_type ASC;");
      for (let key in states[0].values) {
        let [state, district, type] = states[0].values[key];
        if (this.statesTree[state] == null)
          this.statesTree[state] = {};
        if (this.statesTree[state][district] == null)
          this.statesTree[state][district] = [];
        if (this.statesTree[state][district].indexOf(type) < 0)
          this.statesTree[state][district].push(type);
      }
      console.log(this.itemGroup, this.itemCategory, this.statesTree);

    } catch (err) {
      console.log(err);
    }
  }

}
