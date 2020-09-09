import { postsFeatureKey } from './post.reducer';

export const selectPostState = state => state[postsFeatureKey];
