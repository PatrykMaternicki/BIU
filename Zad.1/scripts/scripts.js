
document.addEventListener('DOMContentLoaded', () => this.init());

function Person(json){
    var self = this;
    self.id = json.id;
    self.name  = json.firstName;
    self.surname = json.lastName;
    self.birthsday = json.birthsday;
    self.gender = json.gender;
    self.income = json.income;
    self.email = json.email;
    self.age = json.age;
}

function init(){
    var personList = [];
    data.forEach((record) => personList.push(new Person(record)));
    var viewModel = new PeopleViewModel({
      pageSize: 25,
      count: data.length,
      context: document.getElementById('table'),
      data: personList
    });
    document.getElementById('next').addEventListener('click', () => viewModel.nextPage());
    document.getElementById('back').addEventListener('click', () => viewModel.backPage());
    document.querySelectorAll('[data-action]').forEach( (element) => element.addEventListener('click', (event)=> viewModel.initSort(event)));
    document.querySelectorAll('[data-stock]').forEach((element) => {
      element.addEventListener('click', (event) => viewModel.changePageSize(event));
    });
    //document.getElementById('filter').addEventListener('input', (event) => viewModel.initFilter(event));
    viewModel.init();
}
