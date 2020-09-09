import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { selectPostState } from '../../store/post/post.selector';
import { Post } from '../../store/post/post.model';
import { selectAll as selectAllPosts } from '../../store/post/post.reducer';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { addPost } from 'app/store/post/post.actions';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  posts: Observable<Array<Post>>;
  modalRef: BsModalRef;
  form: FormGroup;
  alreadyExists = false;

  constructor(private store: Store, private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.posts = this.store.pipe(select(selectPostState), select(selectAllPosts));
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z0-9 ,-.]+')]]
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  addPost(): void {
    const { name } = this.form.value;
    this.posts.subscribe(posts => {
      if (posts.filter(post => post.name.toLowerCase().trim() === name.toLowerCase().trim()).length) {
        this.alreadyExists = true;
      } else {
        this.alreadyExists = false;
        this.store.dispatch(addPost({ post: { name } }));
        this.form.reset();
        this.modalRef.hide();
      }
    }).unsubscribe();
  }

}
