export class PersonListItem {

    public id: number;
    public age: number;
    public firstname: string;
    public lastname: string;
    public gender: string;
    public email: string;
    public birthsday: Date
    public income: number;
   
    public toTableRow(): string {
        return '<tr><td>'
            + this.id
            + '</td><td>'
            + this.firstname
            + '</td><td>'
            + this.lastname
            + '</td><td>'
            + this.gender
            + '</td><td>'
            + this.email
            + '</td><td>'
            + this.age
            + '</td><td>'
            + this.birthsday.toISOString()
            + '</td><td>'
            + this.income
            + '</td></tr>'
    }
}