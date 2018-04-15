import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutorComment } from '../blog-post/autor-comment';

@Component({
  selector: 'app-blog-edit-form',
  templateUrl: './blog-edit-form.component.html',
  styleUrls: ['./blog-edit-form.component.css']
})
export class BlogEditFormComponent implements OnInit {
   @Input()  editComment: AutorComment | string;
   @Output() editedComment = new EventEmitter<AutorComment>();

   constructor() { }

   setEditComment(editCommentForm : ngForm, id: number, publishedDate: Date): void {
      let comment = new AutorComment(id, editCommentForm.value.autor, publishedDate, editCommentForm.value.message);
      editCommentForm.resetForm();
      this.editedComment.emit(comment);
   }

  ngOnInit() {
  }

}
