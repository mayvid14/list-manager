import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from './post.model';
import * as PostActions from './post.actions';

export const postsFeatureKey = 'posts';

export interface State extends EntityState<Post> {
  // additional entities state properties
  error: string
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  error: null
});


export const reducer = createReducer(
  initialState,
  on(PostActions.addPostSuccess,
    (state, action) => adapter.addOne(action.post, state)
  ),
  on(PostActions.updatePostSuccess,
    (state, action) => adapter.updateOne(action.post, state)
  ),
  on(PostActions.deletePostSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PostActions.loadPostsSuccess,
    (state, action) => adapter.setAll(action.posts, state)
  ),
  on(PostActions.postError,
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
