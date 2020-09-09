import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Post } from './post.model';

export const loadPosts = createAction(
  '[Post/API] Load Posts'
);

export const addPost = createAction(
  '[Post/API] Add Post',
  props<{ post: Post }>()
);

export const updatePost = createAction(
  '[Post/API] Update Post',
  props<{ post: Update<Post> }>()
);

export const deletePost = createAction(
  '[Post/API] Delete Post',
  props<{ id: string }>()
);

export const loadPostsSuccess = createAction(
  '[Post/API] Load Posts Success', 
  props<{ posts: Post[] }>()
);

export const addPostSuccess = createAction(
  '[Post/API] Add Post Success',
  props<{ post: Post }>()
);

export const updatePostSuccess = createAction(
  '[Post/API] Update Post Success',
  props<{ post: Update<Post> }>()
);

export const deletePostSuccess = createAction(
  '[Post/API] Delete Post Success',
  props<{ id: string }>()
);

export const postError = createAction(
  '[Post/API] Post Error',
  props<{ error: string }>()
);
