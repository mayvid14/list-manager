import Dexie from 'dexie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DB extends Dexie {
  constructor() {
    super('list-manager');
    this.version(1).stores({
      posts: '++id,name',
      companies: '++id,name,status,timestamp,post'
    });
  }
}
