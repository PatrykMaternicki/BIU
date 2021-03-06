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

  setSubComment(emitData: NgForm): void {
    let comment = new AutorComment (
      emitData.value.autor,
      new Date(),
      emitData.value.message
    );
    let index = this.post.comments.findIndex(item => item.id === emitData.value.id);
    this.post.comments[index].subComments.push(comment[0]);
    emitData.resetForm();
  }

  setComment(formComment: NgForm): void {
    let comment = new AutorComment(
      formComment.value.autor,
      new Date(),
      formComment.value.message
    );
    this.post.comments.push(comment);
    formComment.resetForm()
  }

  removeComment(id: number): void {
    this.post.comments = this.post.comments.filter(item => item.id !== id);
  }

  editionComment(id: number): void {
    this.config.edit = true;
    let foundedComment = this.post.comments.filter(item => item.id === id);
    this.editComment = foundedComment[0];
  }

  updateComment(emitData: NgForm): void {
    let index = this.post.comments.findIndex(item => item.id === emitData.value.id);
    let foundedEntity = this.post.comments[index];
    foundedEntity.nameAutor = emitData.value.autor;
    foundedEntity.publishedDate = emitData.value.publishedDate;
    foundedEntity.textComment = emitData.value.message;
    this.post.comments[index] = foundedEntity;
    console.log(this.post.comments[index]) // Update object
    console.log(this.post.comments[0]) // tu tez 
    console.table(this.post) /// A tu nie ma...
    this.config.edit = false;
  }

  ngOnInit() {
  }

}
