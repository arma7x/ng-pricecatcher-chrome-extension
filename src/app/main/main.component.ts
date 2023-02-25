import { Component, OnInit } from '@angular/core';
import { Database } from '../database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public async checkLatestRevision() {
    try {
      console.log(await Database.checkLatestRevision());
    } catch (err) {
      console.log(err);
    }
  }

  public async getLocalRevision() {
    try {
      console.log(await Database.getLocalRevision());
    } catch (err) {
      console.log(err);
    }
  }

  public async updateLocalRevision() {
    try {
      console.log(await Database.updateLocalRevision(await Database.checkLatestRevision()));
    } catch (err) {
      console.log(err);
    }
  }

  public async updateDatabaseArrayBuffer() {
    try {
      console.log(await Database.updateDatabaseArrayBuffer());
    } catch (err) {
      console.log(err);
    }
  }

  public async getDatabaseArrayBuffer() {
    try {
      console.log(await Database.getDatabaseArrayBuffer());
    } catch (err) {
      console.log(err);
    }
  }

  public async getDatabaseInstance() {
    try {
      const db = await Database.getDatabaseInstance(await Database.getDatabaseArrayBuffer());
      const items = db.exec("SELECT * from items;");
      console.log(items);
    } catch (err) {
      console.log(err);
    }
  }

  public async init() {
    try {
      const db = await Database.init();
      const items = db.exec("SELECT * from items;");
      console.log(items);
    } catch (err) {
      console.log(err);
    }
  }

}
