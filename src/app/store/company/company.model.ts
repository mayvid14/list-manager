import { ApplicationStatus } from '../../types/ApplicationStatus';
import { Post } from '../post/post.model';

export interface Company {
  id?: number;
  name: string;
  status: ApplicationStatus,
  timestamp: number,
  post: Post,
}
