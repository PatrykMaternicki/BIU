class Filter {
  constructor() {
    this.regExp = new RegExp();
  }

  filterByName(value, regex) {
    return value.name.includes(regex);
  }
}
