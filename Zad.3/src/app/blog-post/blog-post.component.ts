import { Component, OnInit } from '@angular/core';

import { BlogPost } from "./blog-post";
import { AutorComment } from './autor-comment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

    editComment = 0;
    isEditorVisible = false;
    counter = 0;
    subCounter = 0;
    config = {
      'state': this.isEditorVisible ? 'ukryj edycje' : 'zakryj edycje',
      'edit' : false,
      'mode' : 'smosh'
    };
    post = new BlogPost(
      "New Post",
      new Date(),
      "some content",
      []
      );

  toggleEditMode(): void {
    this.isEditorVisible = !this.isEditorVisible;
    this.config.state = this.isEditorVisible ? 'ukryj edycje' : 'zakryj edycje';
  }

  setComment(formComment: NgForm): void {
    console.log(formComment.value.mode);
    let comment = new AutorComment(
      this.counter,
      formComment.value.autor,
      new Date(),
      formComment.value.message
    );
    if (formComment.value.mode === 'smosh'){
      this.counter++;
      this.post.comments.push(comment);
      formComment.resetForm();
    } else if (formComment.value.mode === 'deeper') {
      this.subCounter++;
      this.post.comments.subComments.push(comment);
      formComment.resetForm();
    }
  }

  removeComment(id: number): void {
    this.post.comments = this.post.comments.filter(item => item.id !== id);
  }

  editionComment(id: number): void {
    this.config.edit = true;
    let foundedComment = this.post.comments.filter(item => item.id === id);
    this.editComment = foundedComment[0];
  }

  updateComment(value: AutorComment) {
    let index = this.post.comments.findIndex(item => item.id === value.id);
    this.post.comments[index] = value;
    this.config.edit = false;
  }

  ngOnInit() {
  }

}
