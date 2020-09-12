import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { selectPostState } from '../../store/post/post.selector';
import { Post } from '../../store/post/post.model';
import { selectAll as selectAllPosts } from '../../store/post/post.reducer';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { addPost } from '../../store/post/post.actions';
import { Company } from '../../store/company/company.model';
import { ApplicationStatus } from '../../types/ApplicationStatus';
import { addCompany } from '../../store/company/company.actions';
import { Cities } from 'app/types/Cities';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  posts: Observable<Array<Post>>;
  modalRef: BsModalRef;
  newPostForm: FormGroup;
  newEntryForm: FormGroup;
  alreadyExists = false;
  cityArray = Cities;

  constructor(private store: Store, private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.posts = this.store.pipe(select(selectPostState), select(selectAllPosts));
    this.newEntryForm = this.fb.group({
      name: ['', [Validators.minLength(2), Validators.required, Validators.pattern('[a-zA-Z0-9 ,-.]+')]],
      postName: [null, [Validators.required]],
      city: [null, [Validators.required]]
    });
    this.newPostForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z0-9 ,-.]+')]]
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  addPost(): void {
    const { name } = this.newPostForm.value;
    this.posts.subscribe(posts => {
      if (posts.filter(post => post.name.toLowerCase().trim() === name.toLowerCase().trim()).length) {
        this.alreadyExists = true;
      } else {
        this.alreadyExists = false;
        this.store.dispatch(addPost({ post: { name } }));
        this.newPostForm.reset();
        this.modalRef.hide();
      }
    }).unsubscribe();
  }

  addCompany(): void {
    const { name, postName, city } = this.newEntryForm.value;
    this.posts.subscribe(posts => {
      const post = posts.filter(p => p.name === postName)[0];
      const company: Company = {
        name,
        status: ApplicationStatus.Applied,
        timestamp: new Date().getTime(),
        post,
        city
      };
      this.store.dispatch(addCompany({ company }));
      this.newEntryForm.reset();
    }).unsubscribe();
  }

}
