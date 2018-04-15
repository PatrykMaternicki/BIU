import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogPostCreatorComponent } from './blog-post-creator/blog-post-creator.component';
import { BlogEditFormComponent } from './blog-edit-form/blog-edit-form.component';



@NgModule({
  declarations: [
    AppComponent,
    BlogPostComponent,
    BlogCommentComponent,
    BlogPostCreatorComponent,
    BlogEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
