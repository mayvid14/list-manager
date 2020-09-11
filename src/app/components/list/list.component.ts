import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { Company } from '../../store/company/company.model';
import { selectCompanyState } from '../../store/company/company.selector';
import { selectAll } from '../../store/company/company.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationStatus } from '../../types/ApplicationStatus';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('aggrid') grid: AgGridAngular;
  companies: Observable<Array<Company>>;
  columnDefs = [
    { headerName: 'Company', field: 'name', resizable: true },
    { headerName: 'Post', field: 'post.name', resizable: true },
    { headerName: 'Status', field: 'status', resizable: true }
  ];
  filterOpts = [{
    key: 'Show all',
    value: null,
  }, {
    key: 'Show applied',
    value: ApplicationStatus.Applied,
  }, {
    key: 'Show in progress applications',
    value: ApplicationStatus.InProgress,
  }, {
    key: 'Show rejected applications',
    value: ApplicationStatus.Rejected,
  }, {
    key: 'Show accepted applications',
    value: ApplicationStatus.Offered,
  }];
  gridFilter: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    this.grid.api.sizeColumnsToFit();
    this.grid.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    this.grid.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
  }

  ngOnInit(): void {
    this.companies = this.store.pipe(select(selectCompanyState), select(selectAll));
    this.gridFilter = this.fb.group({
      filterText: [''],
      filterStatus: [null]
    });
  }

  isExternalFilterPresent(): boolean {
    if (!this.gridFilter) return false;
    const { filterText, filterStatus } = this.gridFilter.value;
    return (filterText.trim() !== '') || (filterStatus !== null);
  }

  doesExternalFilterPass(node: { data: Company }): boolean {
    const { filterText, filterStatus } = this.gridFilter.value;
    const { data } = node;
    let satisfiesText = data.name.toLowerCase().includes(filterText.toLowerCase()) || data.post.name.toLowerCase().includes(filterText.toLowerCase());
    let satisfiesStatus = filterStatus ? data.status === filterStatus : true;
    return (satisfiesText && satisfiesStatus);
  }

  changedValue(): void {
    this.grid.api.onFilterChanged();
  }

}
