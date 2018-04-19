import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  @Output() activeSetComment = new EventEmitter<NgForm>();
  @Output() activeSetSubComment = new EventEmitter<NgForm>();
  @Output() activeToggleSetComment = new EventEmitter<>();
  @Input() mode: string;
  @Input() id: number;

  setCommentAction(form: NgForm): void {
    form.value.mode = this.mode;
    console.log('ID', this.id);
    form.value.id  = !this.id ? 0 : this.id;
    let emitter = this.mode === 'deeper' ? this.activeSetSubComment : this.activeSetComment;
    emitter.emit(form);
    this.activeToggleSetComment.emit();
  }

  ngOnInit() {
  }

}
