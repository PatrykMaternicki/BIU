class Comparator {
  sortByName(person1, person2) {
    return person1.name.localeCompare(person2.name);
  }

  sortBySurName(person1, person2) {
    return person1.surname.localeCompare(person2.surname);
  }

  sortByAge(person1, person2) {
    return person1.age - person2.age;
  }

  sortByBirthday(person1, person2) {
    return person1.birthsday.localeCompare(person2.birthsday);
  }

  sortByGender(person1, person2) {
    return person1.gender.localeCompare(person2.gender);
  }

  sortByIncome(person1, person2) {
    return person1.income.localeCompare(person2.income);
  }

  sortByEmail(person1, person2) {
    return person1.email.localeCompare(person2.email);
  }
  sortById(person1, person2) {
    return person1.id- person2.id;
  }
}
