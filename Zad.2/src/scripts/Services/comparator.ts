export class Comparator {
  public sortByName(person1: string, person2: string) : PersonListItem {
    return person1.firstname.localeCompare(person2.firstname);
  }

  public sortBySurName(person1: string, person2: string) : PersonListItem {
    return person1.lastname.localeCompare(person2.lastname);
  }

  public sortByAge(person1: number, person2: number): PersonListItem {
    return person1.age - person2.age;
  }

  public sortByBirthday(person1: string, person2: string) : PersonListItem {
    return person1.birthsday.localeCompare(person2.birthsday);
  }

  public sortByGender(person1: string, person2: string) : PersonListItem {
    return person1.gender.localeCompare(person2.gender);
  }

  public sortByIncome(person1: Number, person2: Number) : PersonListItem {
    return person1.income - person2.income;
  }

  public sortByEmail(person1: string, person2: string) : PersonListItem {
    return person1.email.localeCompare(person2.email);
  }
  public sortById(person1: number, person2: number) : PersonListItem {
    return person1.id- person2.id;
  }
}
