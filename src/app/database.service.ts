import { Injectable } from '@angular/core';
import { Database } from './database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  sqlInstance: Promise<any> | null;

  constructor() {
    this.sqlInstance = Database.init();
  }

}
