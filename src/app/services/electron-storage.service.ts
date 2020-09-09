import { Injectable } from '@angular/core';
import { Company } from '../store/company/company.model';
import { Post } from '../store/post/post.model';
import { Observable, from } from 'rxjs';
import Dexie from 'dexie';
import { DB } from './db';
import { companiesFeatureKey } from 'app/store/company/company.reducer';
import { postsFeatureKey } from 'app/store/post/post.reducer';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class ElectronStorageService {
  companyCollection: Dexie.Table<Company, number>;
  postCollection: Dexie.Table<Post, number>;

  constructor(private db: DB) {
    this.companyCollection = this.db.table(companiesFeatureKey);
    this.postCollection = this.db.table(postsFeatureKey);
  }

  getAllCompanies(): Observable<Array<Company>> {
    return from(this.companyCollection.toArray());
  }

  getAllPosts(): Observable<Array<Post>> {
    return from(this.postCollection.toArray());
  }

  addCompany(company: Company): Observable<number> {
    return from(this.companyCollection.add(company));
  }

  addPost(post: Post): Observable<number> {
    return from(this.postCollection.add(post));
  }

  updateCompany(data: Update<Company>) {
    const { id, changes } = data;
    return from(this.companyCollection.update(+id, changes).then(_ => data));
  }

  updatePost(data: Update<Post>) {
    const { id, changes } = data;
    return from(this.postCollection.update(+id, data).then(_ => data));
  }

  removeCompany(id: number): Observable<string> {
    return from(this.companyCollection.delete(id).then(_ => id + ''));
  }

  removePost(id: number): Observable<string> {
    return from(this.postCollection.delete(id).then(_ => id + ''));
  }
}
