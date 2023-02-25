import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private database: DatabaseService) { }

  ngOnInit(): void {
    chrome.runtime.onMessage.addListener((evt) => {
      if (evt.type != null && evt.type == "ROUTE" && evt.path != null) {
        this.router.navigate([evt.path]);
      }
    });
  }

  public async getItems() {
    try {
      const db = await this.database.sqlInstance;
      const items = db.exec("SELECT * from items;");
      console.log(items);
    } catch (err) {
      console.log(err);
    }
  }

}
