import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { addCompany, addCompanySuccess, companyError, updateCompany, updateCompanySuccess, loadCompanys, deleteCompany, deleteCompanySuccess, loadCompanysSuccess } from './company.actions';
import { ElectronStorageService } from '../../services/electron-storage.service';
import { of } from 'rxjs';

@Injectable()
export class CompanyEffects {

  constructor(private actions$: Actions, private storage: ElectronStorageService) { }

  loadCompanies = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanys),
      mergeMap(() =>
        this.storage.getAllCompanies().pipe(
          map(companys => loadCompanysSuccess({ companys })),
          catchError(error => of(companyError({ error })))
        )
      )
    )
  );

  addCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(addCompany),
      mergeMap(action =>
        this.storage.addCompany(action.company).pipe(
          map(id => addCompanySuccess({ company: { id, ...action.company } })),
          catchError(error => of(companyError({ error })))
        )
      )
    )
  );

  updateCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCompany),
      mergeMap(action =>
        this.storage.updateCompany(action.company).pipe(
          map(_ => updateCompanySuccess({ company: action.company })),
          catchError(error => of(companyError({ error })))
        )
      )
    )
  );

  deleteCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCompany),
      mergeMap(action =>
        this.storage.removeCompany(+action.id).pipe(
          map(_ => deleteCompanySuccess({ id: action.id })),
          catchError(error => of(companyError({ error })))
        )
      )
    )
  );

}
