import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.css']
})
export class BlogCommentComponent implements OnInit {

  activeForm = false;
  config = {
    mode: 'deeper'
  }
  @Input() comment:string;
  @Input() hideEditOption: boolean;
  @Output() activeRemoveAction = new EventEmitter<number>();
  @Output() activeEditAction = new EventEmitter<number>();
  @Output() activeSubCommentAction = new EventEmitter<number>();

  setRemoveAction(id: number): void {
    this.activeRemoveAction.emit(id);
  }

  setEditAction(id: number): void{
    this.activeEditAction.emit(id);
  }

  toggleSetComment(){
    this.activeForm = !this.activeForm;
  }

  emitToPostComponent(emitData: NgForm) : void {
    this.activeSubCommentAction.emit(emitData);
  }

  ngOnInit() {

  }
}
