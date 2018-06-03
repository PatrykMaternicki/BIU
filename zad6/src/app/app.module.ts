import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YoutubeService } from './youtube/youtube-service';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { SearchboxComponent } from './searchbox/searchbox.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchboxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
