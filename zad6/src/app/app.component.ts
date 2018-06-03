import { Component } from '@angular/core';
import { SearchResult } from "app/youtube/search-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  results: SearchResult[];
  loading: boolean;
  constructor() { }

  ngOnInit() {
  }

  updateResults(results: SearchResult[]): void {
  this.results = results;
  }
}
