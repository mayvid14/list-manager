import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { Company } from '../../store/company/company.model';
import { selectCompanyState } from '../../store/company/company.selector';
import { selectAll } from '../../store/company/company.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationStatus } from '../../types/ApplicationStatus';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActionsColumnComponent } from './actions-column.component';
import { Post } from '../../store/post/post.model';
import { selectPostState } from '../../store/post/post.selector';
import { selectAll as selectAllPosts } from '../../store/post/post.reducer';
import { Update } from '@ngrx/entity';
import { updateCompany } from '../../store/company/company.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('aggrid') grid: AgGridAngular;
  @ViewChild('editModal') modalTemplate: TemplateRef<any>;
  modalRef: BsModalRef;
  companies: Observable<Array<Company>>;
  columnDefs = [
    { headerName: 'Company', field: 'name', resizable: true },
    { headerName: 'Post', field: 'post.name', resizable: true },
    { headerName: 'Status', field: 'status', resizable: true },
    { headerName: 'Actions', resizable: true, cellRenderer: 'actionsColumnComponent' }
  ];
  frameworkComponents = {
    actionsColumnComponent: ActionsColumnComponent
  };
  context = { componentParent: this };
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
  editPostForm: FormGroup;
  postsOpts: Observable<Array<Post>>;
  statusOpts = [{
    key: 'Applied',
    value: ApplicationStatus.Applied,
  }, {
    key: 'In progress',
    value: ApplicationStatus.InProgress,
  }, {
    key: 'Rejected',
    value: ApplicationStatus.Rejected,
  }, {
    key: 'Offered',
    value: ApplicationStatus.Offered,
  }];

  constructor(private store: Store, private fb: FormBuilder, private modal: BsModalService) { }

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
    this.editPostForm = this.fb.group({
      name: ['', [Validators.minLength(2), Validators.required, Validators.pattern('[a-zA-Z0-9 ,-.]+')]],
      postName: [null, [Validators.required]],
      status: [ApplicationStatus.Applied],
      idField: [''],
    });
    this.postsOpts = this.store.pipe(select(selectPostState), select(selectAllPosts));
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

  openModal(initialState: Company): void {
    this.editPostForm.setValue({
      name: initialState.name,
      postName: initialState.post.name,
      status: initialState.status,
      idField: initialState.id,
    });
    this.modalRef = this.modal.show(this.modalTemplate);
  }

  updatePost(): void {
    const { name, postName, status, idField } = this.editPostForm.value;
    this.postsOpts.subscribe((posts: Post[]) => {
      const post = posts.filter(p => p.name === postName)[0];
      const company: Update<Company> = {
        id: idField,
        changes: {
          name,
          status,
          timestamp: new Date().getTime(),
          post
        }
      };
      this.store.dispatch(updateCompany({ company }));
      this.modalRef.hide();
    }).unsubscribe();
  }

}
