import { Injectable } from '@angular/core';
import { Database } from './database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  instance: any | null;

  constructor() {
    this.instance = Database;
  }

}
