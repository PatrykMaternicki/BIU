
import { people } from './data'; //-> import danych o osobach
import { PersonListItem } from "../person-list-item";//-> impoert klasy PersonListItem
import {Comparator} from "./comparator.ts"
console.log(Comparator);
export class PagingInfo {
    constructor(public page: number, public count: number) {
    }
}

export class PersonService {

    comparator = new Comparator();

    public getPeople(pagingInfo: PagingInfo): Array<PersonListItem> {

        let begin = pagingInfo.page - 1;
        if (begin < 0) begin = 0;

        return people
            .slice(begin * pagingInfo.count,
                    begin * pagingInfo.count + pagingInfo.count)
                //-> z zaimportowanej kolekcji wybieramy stronę wynikow
            .map(x => {
                let person = new PersonListItem();
                person.firstname = x.firstName;
                person.lastname = x.lastName;
                person.gender = x.gender;
                person.email = x.email;
                person.income = +x.income
                person.age = x.age;
                person.birthsday = new Date(x.birthsday);
                person.id = x.id;
                return person;
            });
            //-> pobrane wyniki mapujemy na obiekty PersonListItem
    }

    public find(findValues: any) : void {
      let list = people.map(x => {
          let person = new PersonListItem();
          person.firstname = x.firstName;
          person.lastname = x.lastName;
          person.gender = x.gender;
          person.email = x.email;
          person.income = +x.income
          person.age = x.age;
          person.birthsday = new Date(x.birthsday);
          person.id = x.id;
          return person;
      });
      let records = list.find((el,index,array,findValues)=>this.equalField(el,index,array,findValues))
      console.log(records);
    }

    public equalField(element, inedex,array, findValues) : Array {
      console.log('FIND', findValues)
      return element.firstname == findValues.name && element.lastname == findValues.surname && element.age == findValues.age;
    }

    public sortPeople(sortIn: String, pagingInfo: PagingInfo): Array<PersonListItem> {
      let personListItem = this.getPeople(pagingInfo);
      switch(sortIn) {
      case 'name': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByName(el1, el2));
      }
      case 'surname': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortBySurName(el1, el2));
      }
      case 'age': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByAge(el1, el2));
      }
      case 'birthsday': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByBirthday(el1, el2));
      }
      case 'gender': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByGender(el1, el2));
      }
      case 'income': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByIncome(el1, el2));
      }
      case 'email': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortByEmail(el1, el2));
      }
      case 'id': {
        this.currentPage = 0;
        return personListItem.sort((el1,el2)=>this.comparator.sortById(el1, el2));
      }
    }
  }
}

var service = new PersonService();

console.log(service.getPeople(new PagingInfo(1, 5)));
