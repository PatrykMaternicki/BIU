import { PersonListItem } from "./person-list-item";

export class PersonList {

    private _people : Array<PersonListItem> = [];
    public get people() : Array<PersonListItem> {
        return this._people;
    }
    public set people(v : Array<PersonListItem>) {
        this._people = v;
    }

    public toTable(): string {
        var table = '<table class="table table-striped table-hover table-bordered">';
        table += this.generateTableHeader();
        this._people.forEach(person => table += person.toTableRow());
        table += '</table>'
        return table;
    }

    public clear() {
        this._people = [];
    }

    private generateTableHeader(): string {
        return '<tr><th><input type="button" class="btn btn-sm btn-danger sortWith" value="Id"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Name"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Surname"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Gender"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Email"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Age"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Birthday"/></th>'
            + ' <th><input type="button" class="btn btn-sm btn-danger sortWith" value="Income"/></th>'
            + '</tr>'
    }
}
