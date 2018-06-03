
export class Filter {

  public regex: string = '';
  public setPattern(pattern: string) : void {
    this.regex = pattern;
  }

  public filterBySurname(value): any {
    return value.lastname.includes(this.regex);
  }

  public filterByName(value): any {
    return value.firstname.includes(this.regex);
  }

  public filterByEmail(value): any {
    return value.email.includes(this.regex);
  }

  public flushPattern() : void {
    this.regex = '';
  }

}
