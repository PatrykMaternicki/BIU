import { PersonList } from "./person-list";
import { PersonService, PagingInfo } from "./Services/person-service";

export class PersonTable{

    constructor(public context: JQuery) {
    }

    personService = new PersonService()
    list = new PersonList();
    currentPage = 0;
    pageSize = 10;

    public next() {
        this.list.clear();
        this.currentPage++;
        this.list.people = this.personService.getPeople(new PagingInfo(this.currentPage, this.pageSize));
        this.refreshTable();
    }

    public prev(): void {
        this.list.clear();
        if (this.currentPage <= 1) return;
        this.currentPage--;
        this.list.people = this.personService.getPeople(new PagingInfo(this.currentPage, this.pageSize));
        this.refreshTable();
    }

    public changeRecordsInTable(element : HTMLInputElement) : void {
      this.pageSize = Number.parseInt(element.target.value);
      this.next();
    }

    public sortBy(element : HTMLInputElement) : void  {
      this.list.clear();
      this.list.people = this.personService.sortPeople(element.target.value.toLowerCase(), new PagingInfo(this.currentPage, this.pageSize));
      this.refreshTable();
    }

    public find(form: HTMLElement) : void {
      let inputs = form.querySelectorAll('input[type="text"]');
      console.log(inputs);
      let wantedValues = {
        name : inputs.item(0).value,
        lastname: inputs.item(1).value,
        age: Number.parseInt(inputs.item(2).value);
      }
      this.personService.find(wantedValues);
    }

    private refreshTable() {
        this.context.html(this.list.toTable());
    }
}
