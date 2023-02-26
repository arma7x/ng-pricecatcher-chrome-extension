import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-premise',
  templateUrl: './premise.component.html',
  styleUrls: ['./premise.component.scss']
})
export class PremiseComponent implements OnInit {

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

  public async getPremises() {
    try {
      const db = await this.database.instance.init();
      const premises = db.exec("SELECT * from premises;");
      console.log(premises);
    } catch (err) {
      console.log(err);
    }
  }

}
