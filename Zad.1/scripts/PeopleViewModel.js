class PeopleViewModel {
  constructor(options) {
    this.pageSize = options.pageSize;
    this.count = options.count;
    this.context = options.context;
    this.begin = 0;
    this.end = 0;
    this.data = options.data;
    this.virtualDOM = '';
    this.currentPage = 0;
    this.comparator = new Comparator();
    this.filter = new Filter();
  }

  initSort(e) {
    switch(e.target.dataset.action) {
      case 'sortByName': {
        this.data.sort((el1,el2)=>this.comparator.sortByName(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortBySurName': {
        this.data.sort((el1,el2)=>this.comparator.sortBySurName(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortByAge': {
        this.data.sort((el1,el2)=>this.comparator.sortByAge(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortByBirthday': {
        this.data.sort((el1,el2)=>this.comparator.sortByBirthday(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortByGender': {
        this.data.sort((el1,el2)=>this.comparator.sortByGender(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortByIncome': {
        this.data.sort((el1,el2)=>this.comparator.sortByIncome(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'sortByEmail': {
        this.data.sort((el1,el2)=>this.comparator.sortByEmail(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
      case 'reset': {
        this.data.sort((el1,el2)=>this.comparator.sortById(el1, el2));
        this.currentPage = 0;
        this.init();
        break;
      }
    }
  }

  // initFilter(e) {
  //   //var val = e.target.value;
  //   //console.log('regex', e.target.value);
  //   this.data = this.data.filter((el, val) => this.filter.filterByName(el,val));
  // }

  init() {
    this.nextPage();
  }

  changePageSize(e) {
    this.pageSize = e.target.dataset.stock;
    this.nextPage();
  }

  nextPage() {
    let begin = this.currentPage * this.pageSize;
    let end = (this.currentPage +1) * this.pageSize;
    this.render(begin,end);
    this.clear();
    this.currentPage++;
  }

  backPage() {
    if (this.currentPage-1 >= 0) {
      this.currentPage--;
    }
    let begin = this.currentPage * this.pageSize;
    let end = (this.currentPage +1) * this.pageSize;
    this.render(begin, end);
    this.clear();
  }

  maximumPage() {
    return this.begin === this.count;
  }

  minimumPage() {
    return this.begin <= 0;
  }

  render (begin, end) {
    this.virtualDOM = '<table>';
    this.virtualDOM += this.renderTableHeader();
    var renderData = this.getData(begin,end);
    for (var i=0; i < renderData.length; i++) {
      this.virtualDOM += this.renderRow(renderData[i]);
    }
    this.context.innerHTML = this.virtualDOM;
  }

  getData(begin, end) {
    let arr = [];
    if (end>data.length) {
      end = data.length;
    }

    if (begin<0) {
      begin = 0;
    }
    for (var i = begin; i<end;  i+=1){
        arr.push(this.data[i])
      }
    return arr;
  }

  clear() {
    this.virtualDOM = '';
  }

  renderRow(json) {
    let row = '';
    row += "<tr>"
    for (let prop in json) {
      row += "<td>";
      row += json[prop];
      row += "</td>";
    }
    row += "</tr>"
    return row;
  }

  renderTableHeader() {
      return '<tr>'
              + '<th>ID</th>'
              + '<th>name</th>'
              + '<th>Surname</th>'
              + '<th>birthsday</th>'
              + '<th>gender</th>'
              + '<th>income</th>'
              + '<th>email</th>'
              + '<th>age</th>'
            +'</tr>'
  }
}
