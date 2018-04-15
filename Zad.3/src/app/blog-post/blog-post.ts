import { AutorComment } from './autor-comment';
export class BlogPost{
 constructor(
 public title:string,
 public date: Date,
 public content:string,
 public comments:Array<AutorComment>=[]){}
}
