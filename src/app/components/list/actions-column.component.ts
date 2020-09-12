import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions-column',
  template: `
    <button type="button" class="btn btn-info btn-sm" (click)="invokePopup()">Edit Application</button>
  `,
  styles: []
})
export class ActionsColumnComponent implements OnInit, ICellRendererAngularComp {
  params: ICellRendererParams;
  id: string;
  ddid: string;

  constructor() { }
  refresh(_params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.id = 'btn_dd_' + params.data.id;
    this.ddid = 'dd_' + params.data.id;
  }
  afterGuiAttached?(_params?: IAfterGuiAttachedParams): void {
    // throw new Error('Method not implemented.');
  }

  invokePopup(): void {
    this.params.context.componentParent.openModal(this.params.data);
  }

  ngOnInit(): void {
  }

}
