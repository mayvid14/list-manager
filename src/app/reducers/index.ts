import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AppConfig as environment } from '../../environments/environment';
import {reducer as companyReducer, State as CompanyState} from '../store/company/company.reducer';
import {reducer as postReducer, State as PostState} from '../store/post/post.reducer';

export interface State {
  companies: CompanyState,
  posts: PostState
}

export const reducers: ActionReducerMap<State> = {
  companies: companyReducer,
  posts: postReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
