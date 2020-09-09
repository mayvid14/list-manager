import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCompanyState, selectInProgressCompanies, selectOfferedCompanies, selectRejectedCompanies } from '../../store/company/company.selector';
import { selectTotal as selectTotalCompanies, selectAll as selectCompanies } from '../../store/company/company.reducer';
import { Company } from 'app/store/company/company.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  str: any;
  total: Observable<number>;
  inProgress: Observable<number>;
  rejected: Observable<number>;
  offered: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.str = this.store;
    this.total = this.store.pipe(select(selectCompanyState), select(selectTotalCompanies));
    this.inProgress = this.getCompanyPipe().pipe(select(selectInProgressCompanies));
    this.rejected = this.getCompanyPipe().pipe(select(selectRejectedCompanies));
    this.offered = this.getCompanyPipe().pipe(select(selectOfferedCompanies));
  }

  private getCompanyPipe(): Observable<Array<Company>> {
    return this.store.pipe(select(selectCompanyState), select(selectCompanies));
  }

}
