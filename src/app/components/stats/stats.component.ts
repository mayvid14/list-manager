import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { countCities, selectCompanyState, selectInProgressCompanies, selectOfferedCompanies, selectRejectedCompanies } from '../../store/company/company.selector';
import { selectTotal as selectTotalCompanies, selectAll as selectCompanies } from '../../store/company/company.reducer';
import { Company } from '../../store/company/company.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  str: any;
  total: Observable<number>;
  inProgress: Observable<number>;
  rejected: Observable<number>;
  offered: Observable<number>;
  citiesCount: object;
  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.str = this.store;
    this.total = this.store.pipe(select(selectCompanyState), select(selectTotalCompanies));
    this.inProgress = this.getCompanyPipe().pipe(select(selectInProgressCompanies));
    this.rejected = this.getCompanyPipe().pipe(select(selectRejectedCompanies));
    this.offered = this.getCompanyPipe().pipe(select(selectOfferedCompanies));
    this.subscription = this.getCompanyPipe().pipe(select(countCities)).subscribe(count => {
      this.citiesCount = {};
      for(let val in count) {
        if (count[val] > 0) {
          this.citiesCount[val] = count[val];
        }
      }
    });
  }

  private getCompanyPipe(): Observable<Array<Company>> {
    return this.store.pipe(select(selectCompanyState), select(selectCompanies));
  }

}
