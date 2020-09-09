import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Company } from './company.model';
import * as CompanyActions from './company.actions';

export const companiesFeatureKey = 'companies';

export interface State extends EntityState<Company> {
  // additional entities state properties
  error: string
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  error: null
});


export const reducer = createReducer(
  initialState,
  on(CompanyActions.addCompanySuccess,
    (state, action) => adapter.addOne(action.company, state)
  ),
  on(CompanyActions.updateCompanySuccess,
    (state, action) => adapter.updateOne(action.company, state)
  ),
  on(CompanyActions.deleteCompanySuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CompanyActions.loadCompanysSuccess,
    (state, action) => adapter.setAll(action.companys, state)
  ),
  on(CompanyActions.companyError,
    (state, action) => ({
      ...state,
      error: action.error
    })
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
