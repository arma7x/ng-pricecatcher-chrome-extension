import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  latestRevision: number = 0;
  localRevision: number = 0;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.run();
  }

  async run() {
    try {
      this.localRevision = await this.database.instance.getLocalRevision();
      this.latestRevision = await this.database.instance.checkLatestRevision();
    } catch (err) {
      console.log(err);
    }
  }

  public openPage(path: string = 'main') {
    const mainUrl = chrome.runtime.getURL('index.html');
    chrome.tabs.query({url: mainUrl}, (tabs: any[]) => {
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {active: true});
        chrome.runtime.sendMessage({ type: 'ROUTE', path: path }).catch(err => console.log(err));
      } else {
        chrome.tabs.create({ 'url': chrome.runtime.getURL(`index.html#/${path}`) });
      }
    });
  }

}
