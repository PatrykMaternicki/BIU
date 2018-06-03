
import { people } from './data'; //-> import danych o osobach
import { Person } from "app/models/person";

export class PagingInfo {
    constructor(public page: number, public count: number) {
    }
}

export class PersonService {

    public getPeople(pagingInfo: PagingInfo): Array<Person> {

        let begin = pagingInfo.page - 1;
        if (begin < 0) begin = 0;

        return people
            .slice(begin * pagingInfo.count,
                    begin * pagingInfo.count + pagingInfo.count)
            .map(x =>  new Person(
                    x.id,
                    x.firstName,
                    x.lastName,
                    x.gender,
                    x.age,
                    new Date(x.birthsday),
                    +x.income,
                    x.email
                )
            );
    }

    public update(person : Person): void {
        let findIndex = people.findIndex(el => el.id === person.id);
        people[findIndex].firstName = person.firstname;
        people[findIndex].lastName = person.lastname;
        people[findIndex].age = person.age;
        people[findIndex].birthsday = `${person.birthday}`;
        people[findIndex].gender = person.gender;
        people[findIndex].income = `${person.income}`;
        people[findIndex].email = `${person.email}`;
    }

    public delete(person: Person) {
        let wantedIndex = people.findIndex(el => el.id === person.id);
        people.splice(wantedIndex, 1);
        return people.map(
            (x =>  new Person(
                x.id,
                x.firstName,
                x.lastName,
                x.gender,
                x.age,
                new Date(x.birthsday),
                +x.income,
                x.email)
            )
        );
    }
}

var service = new PersonService();

console.log(service.getPeople(new PagingInfo(1, 5)));
