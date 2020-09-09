import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ElectronStorageService } from 'app/services/electron-storage.service';
import { loadPosts, loadPostsSuccess, postError, addPost, addPostSuccess, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './post.actions';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';



@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private storage: ElectronStorageService) { }

  loadPosts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.storage.getAllPosts().pipe(
          map(posts => loadPostsSuccess({ posts })),
          catchError(error => of(postError({ error })))
        )
      )
    )
  );

  addPost = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      mergeMap(action =>
        this.storage.addPost(action.post).pipe(
          map(id => addPostSuccess({ post: { id, ...action.post } })),
          catchError(error => of(postError({ error })))
        )
      )
    )
  );

  updatePost = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      mergeMap(action =>
        this.storage.updatePost(action.post).pipe(
          map(_ => updatePostSuccess({ post: action.post })),
          catchError(error => of(postError({ error })))
        )
      )
    )
  );

  deletePost = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      mergeMap(action =>
        this.storage.removePost(+action.id).pipe(
          map(_ => deletePostSuccess({ id: action.id })),
          catchError(error => of(postError({ error })))
        )
      )
    )
  );

}
