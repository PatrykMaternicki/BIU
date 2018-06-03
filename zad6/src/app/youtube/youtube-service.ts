import { SearchResult } from './search-result';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

 private apiKey = 'AIzaSyDxugcveCG_gLvxIAvS01jGE8QV6rdw4U4';
 private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: Http) { }

  search(query: string):Observable<SearchResult[]>{
    const params : string =[
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
      ].join('&');
      const queryUrl = `${this.apiUrl}?${params}`;
      return this.http.get(queryUrl)
        .map((response:Response)=>{
          return (<any>response.json()).items.map(item=>{
          return new SearchResult({
            id: item.id.videId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
    }
}
