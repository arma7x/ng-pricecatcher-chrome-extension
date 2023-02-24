import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public openMain() {
    const mainUrl = chrome.runtime.getURL('index.html');
    chrome.tabs.query({url: mainUrl}, (tabs: any[]) => {
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {active: true});
      } else {
        chrome.tabs.create({ 'url': chrome.runtime.getURL('index.html#/main') });
      }
    });
  }

}
