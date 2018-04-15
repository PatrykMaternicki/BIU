import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  @Output() activeSetComment = new EventEmitter<NgForm>();
  @Input() mode: string;

  setCommentAction(form: NgForm): void {
    console.log('stan', this.mode);
    form.value.mode = this.mode;
    this.activeSetComment.emit(form);
  }

  ngOnInit() {
  }

}
