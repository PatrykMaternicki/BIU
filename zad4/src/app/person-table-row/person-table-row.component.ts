import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from "app/models/person";

@Component({
  selector: '[person-table-row]', // <-- o tutaj
  templateUrl: './person-table-row.component.html',
  styleUrls: ['./person-table-row.component.css']
})
export class PersonTableRowComponent implements OnInit {
  @Output() editedPerson = new EventEmitter<Person>();
  @Output() removedPerson = new EventEmitter<Person>();
  @Input() model:Person;

  state = {
    notActiveButton: {
      'buttonUp' : { 'text': 'edit' ,'typeAction' : 'edit' },
      'buttonDown' : { 'text': 'delete', 'typeAction': 'delete'}
    },
    activeButton: {
      'buttonUp' : {'text' : 'save', 'typeAction' : 'save'},
      'buttonDown' : {'text' : 'undo', 'typeAction' : 'undo'}
    },
    showInput : false
  }
  name = '';
  cachePerson: Person;
  buttonUp = this.state.notActiveButton.buttonUp.text
  buttonDown = this.state.notActiveButton.buttonDown.text
  buttonActionUp = this.state.notActiveButton.buttonUp.typeAction;
  buttonActionDown = this.state.notActiveButton.buttonDown.text;
  constructor() { }

  ngOnInit() {
  }

  dispatchAction(element : any, model : Person) : void {
    let bindElement = element.target;
    console.log(bindElement.dataset.action);
    switch(bindElement.dataset.action) {
      case 'edit': this.editPerson(model); break;
      case 'delete': this.deletePerson(model); break;
      case 'undo' : this.undoPerson(); break;
      case 'save' : this.savePerson(model); break;
    }
  }

  savePerson(model: Person): any {
    this.editedPerson.emit(model);
    this.buttonUp = this.state.notActiveButton.buttonUp.text;
    this.buttonActionUp = this.state.notActiveButton.buttonUp.typeAction;
    this.state.showInput = false;
  }

  undoPerson(): any {
    this.model = this.cachePerson;
  }

  deletePerson(model: Person): any {
    this.removedPerson.emit(model);
  }

  editPerson(model: Person): any {
    this.cachePerson = new Person(
      model.id,
      model.firstname,
      model.lastname,
      model.gender,
      model.age,
      model.birthday,
      model.income,
      model.email
    );
    this.buttonUp = this.state.activeButton.buttonUp.text;
    this.buttonDown = this.state.activeButton.buttonDown.text;
    this.buttonActionUp = this.state.activeButton.buttonUp.typeAction;
    this.buttonActionDown = this.state.activeButton.buttonDown.typeAction;
    this.state.showInput = true;
  }


}
