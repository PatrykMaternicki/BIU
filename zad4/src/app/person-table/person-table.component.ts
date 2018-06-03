import { Component, OnInit } from '@angular/core';
import { Person } from "app/models/person";
import { PersonService, PagingInfo } from "app/services/person-service";
import { Filter }  from "app/services/filter";

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  items: Person[] = [];

  private nameAsc: boolean = true
  private surNameAsc: boolean = true
  private genderAsc: boolean = true
  private emailAsc: boolean = true
  private ageAsc: boolean = true

  private radioActive: boolean = false

  private statesInput =  {
    ageInput : {
      'from': false,
      'to': false,
      'fromValue' : 0,
      'toValue' : 0,
    },
    birthsdayInput : {
      'from': false,
      'to': false,
      'fromValue' : new Date(),
      'toValue' : new Date(),
    },
    incomeInput : {
      'from': false,
      'to': false,
      'fromValue' : 0,
      'toValue' : 0,
    }
  }

  public sortByName() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.firstname.localeCompare(y.firstname));
    else
      this.items.sort((x, y) => -x.firstname.localeCompare(y.firstname));
    this.nameAsc = !this.nameAsc;
  }

  public sortBySurName(): void {
    if (this.surNameAsc)
      this.items.sort((x, y) => x.lastname.localeCompare(y.lastname));
    else
      this.items.sort((x, y) => -x.lastname.localeCompare(y.lastname));
      this.surNameAsc = !this.surNameAsc;
  }

  public sortByGender(): void {
    if (this.genderAsc)
      this.items.sort((x, y) => x.gender.localeCompare(y.gender));
    else
      this.items.sort((x, y) => -x.gender.localeCompare(y.gender));
      this.genderAsc = !this.surNameAsc;
  }

  public sortByEmail(): void {
    if (this.emailAsc)
      this.items.sort((x, y) => x.email.localeCompare(y.email));
    else
      this.items.sort((x, y) => -x.email.localeCompare(y.email));
      this.emailAsc = !this.emailAsc;
  }

  public sortByAge(): void {

  }

  public sortByBirthsday(): void {

  }

  public sortByIncome(): void {

  }

  public filterFromName(eventElement: any): void {
    if (eventElement.target.value.length > 0) {
      let value = eventElement.target.value;
      this.items = this.items.filter((el) => el.firstname.indexOf(value) > -1);
    } else if (eventElement.target.value.length === 0) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }
  }

  public filterFromSurName(eventElement: any): void {
    if (eventElement.target.value.length > 0) {
      let value = eventElement.target.value;
      this.items = this.items.filter((el) => el.lastname.indexOf(value) > -1);
    } else if (eventElement.target.value.length === 0) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }
  }

  public filterFromEmail(eventElement: any): void {
    if (eventElement.target.value.length > 0) {
      let value = eventElement.target.value;
      this.items = this.items.filter((el) => el.email.indexOf(value) > -1);
    } else if (eventElement.target.value.length === 0) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }
  }

  public filterFromGender(eventElement: any): void {
    if(this.radioActive) {
      this.radioActive = false;
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }
      let value = eventElement.target.value;
      this.radioActive = true;
      this.items = this.items.filter((el) => el.gender == value);
  }

  public filterFromAge(eventElement: any, mode: string) : void {
    if (eventElement.target.value.length === 0) {
      mode === 'from' ? this.statesInput.ageInput.from = false : this.statesInput.ageInput.to = false;
    } else {
      mode === 'from' ? this.statesInput.ageInput.from = true : this.statesInput.ageInput.to = true;
    }

    if (this.statesInput.ageInput.from && mode === 'from') {
      this.statesInput.ageInput.fromValue = Number.parseInt(eventElement.target.value);
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }

    if  (this.statesInput.ageInput.to && mode === 'to') {
      this.statesInput.ageInput.toValue = Number.parseInt(eventElement.target.value);
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }

    if (this.statesInput.ageInput.to && this.statesInput.ageInput.from) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.age > this.statesInput.ageInput.fromValue
        && el.age < this.statesInput.ageInput.toValue);
        return;
    }

    if (this.statesInput.ageInput.from) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.age >= this.statesInput.ageInput.fromValue);
      return;
    }

    if (this.statesInput.ageInput.to){
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.age < this.statesInput.ageInput.toValue);
      return;
    }
  }

  public filterFromBirthsday(eventElement: any, mode: string) {
    if (eventElement.target.value.length === 0) {
      mode === 'from' ? this.statesInput.birthsdayInput.from = false : this.statesInput.birthsdayInput.to = false;
    } else {
      mode === 'from' ? this.statesInput.birthsdayInput.from = true : this.statesInput.birthsdayInput.to = true;
    }

    if (!this.statesInput.birthsdayInput.from && !this.statesInput.birthsdayInput.to) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      return;
    }

    if (this.statesInput.birthsdayInput.from && mode === 'from') {
      this.statesInput.birthsdayInput.fromValue = new Date (eventElement.target.value);
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }

    if  (this.statesInput.birthsdayInput.to && mode === 'to') {
      this.statesInput.birthsdayInput.toValue = new Date (eventElement.target.value);
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }

    if (this.statesInput.birthsdayInput.to && this.statesInput.birthsdayInput.from) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.birthday > this.statesInput.birthsdayInput.fromValue
        && el.birthday < this.statesInput.birthsdayInput.toValue);
        return;
    }

    if (this.statesInput.birthsdayInput.from) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.birthday >= this.statesInput.birthsdayInput.fromValue);
      return;
    }

    if (this.statesInput.birthsdayInput.to){
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.birthday < this.statesInput.birthsdayInput.toValue);
      return;
    }
  }

  filterFromIncome(eventElement: any, mode: string) : void {
    if (eventElement.target.value.length === 0) {
      mode === 'from' ? this.statesInput.incomeInput.from = false : this.statesInput.incomeInput.to = false;
    } else {
      mode === 'from' ? this.statesInput.incomeInput.from = true : this.statesInput.incomeInput.to = true;
    }

    if (!this.statesInput.incomeInput.from && !this.statesInput.incomeInput.to) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      return;
    }

    if (this.statesInput.incomeInput.from && mode === 'from') {
      this.statesInput.incomeInput.fromValue = Number.parseFloat(eventElement.target.value);
    }

    if (this.statesInput.incomeInput.to && mode === 'to') {
      this.statesInput.incomeInput.toValue = Number.parseFloat(eventElement.target.value);
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    }

    if(this.statesInput.incomeInput.from && this.statesInput.incomeInput.to) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.income > this.statesInput.incomeInput.fromValue
        && el.income < this.statesInput.incomeInput.toValue);
      return;
    }

    if (this.statesInput.incomeInput.from) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.income >= this.statesInput.incomeInput.fromValue);
      return;
    }

    if (this.statesInput.incomeInput.to) {
      this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
      this.items = this.items.filter(el => el.income < this.statesInput.incomeInput.toValue);
      return;
    }
  }

  updatePerson(data : Person) : void {
    this.personService.update(data);
  }

  removePerson(data : Person) : void {
    this.items = this.personService.delete(data);
  }

  private currentPage = 1;

  public next() {
    this.items = [];
    this.currentPage++;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
  }

  public prev(): void {
    if (this.currentPage <= 1) return;
    this.items = [];
    this.currentPage--;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
  }


  constructor(private personService: PersonService,
              private  filter: Filter
  ) { }

  ngOnInit() {
    this.items = this.personService.getPeople(new PagingInfo(1, 10));
  }

}
