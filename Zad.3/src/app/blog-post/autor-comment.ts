export class AutorComment {
  constructor(
    public id: number,
    public nameAutor:string,
    public publishedDate: Date,
    public textComment: string{},
    public subComments: Array<AutorComment>=[]){}
}
