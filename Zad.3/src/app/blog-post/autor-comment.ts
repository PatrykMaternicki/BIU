export class AutorComment {
  static counter : number = 0;
  constructor(
    public nameAutor:string,
    public publishedDate: Date,
    public textComment: string{},
    public subComments: Array<AutorComment>=[]){
      this.id = AutorComment.counter++;
    }

}
