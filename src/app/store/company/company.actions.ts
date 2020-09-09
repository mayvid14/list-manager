import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Company } from './company.model';

export const loadCompanys = createAction(
  '[Company/API] Load Companys', 
  props<{ companys: Company[] }>()
);

export const addCompany = createAction(
  '[Company/API] Add Company',
  props<{ company: Company }>()
);

export const updateCompany = createAction(
  '[Company/API] Update Company',
  props<{ company: Update<Company> }>()
);

export const deleteCompany = createAction(
  '[Company/API] Delete Company',
  props<{ id: string }>()
);

export const loadCompanysSuccess = createAction(
  '[Company/API] Load Companys Success', 
  props<{ companys: Company[] }>()
);

export const addCompanySuccess = createAction(
  '[Company/API] Add Company Success',
  props<{ company: Company }>()
);

export const updateCompanySuccess = createAction(
  '[Company/API] Update Company Success',
  props<{ company: Update<Company> }>()
);

export const deleteCompanySuccess = createAction(
  '[Company/API] Delete Company Success',
  props<{ id: string }>()
);

export const companyError = createAction(
  '[Company/API] Company Error',
  props<{ error: string }>()
);
