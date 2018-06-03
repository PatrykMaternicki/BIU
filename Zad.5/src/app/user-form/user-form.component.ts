import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime'


function passwordMatcher(c: AbstractControl):{[key:string]:boolean}|null{
  let passwordControl = c.get('password');
  let confirmPasswordControl = c.get('cPassword');
  if(passwordControl.pristine || confirmPasswordControl.pristine)
    return null;
  if(passwordControl.value === confirmPasswordControl.value)
    return null;
  return {'matchPasswords':true};
}

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userExists:boolean=false;
  exception = {
    phone: 'Number is valid',
    passwordPattern: 'Password is not corect with pattern',
    passwordConfirm: 'Passwords is not same',
    token: 'Token valid',
    required: '!Required'
  }

  matchPasswordsMsg;
  passwordPatternMsg;
  phoneRequired = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      sms: ['no', ],
      phone: ['', [Validators.pattern(/[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}/)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      token: ['', [ Validators.pattern(/^abc123$/)]],
      pswdGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]],
        cPassword: ['', [Validators.required]]
      }, {
        validator: passwordMatcher
      })
    });

    this.userForm.get('username').valueChanges.debounceTime(1000).subscribe(value=>{
      if(value==='admin')
        this.userExists=true;
      else this.userExists=false;
    })

    let passwordGroup = this.userForm.get("pswdGroup");
    let password = this.userForm.get("pswdGroup.password");
    password.valueChanges.debounceTime(500).subscribe(value=>{
      this.passwordPatternMsg='';
      if((password.touched||password.dirty)&&password.getError('pattern')){
        this.passwordPatternMsg = this.exception['passwordPattern'];
      }
    });

    let confirmPassword = this.userForm.get("pswdGroup.cPassword");
    confirmPassword.valueChanges.debounceTime(500).subscribe(value=>{
    this.matchPasswordsMsg='';
      if((confirmPassword.touched||confirmPassword.dirty)&&passwordGroup.getError('matchPasswords')){
        this.matchPasswordsMsg = this.exception['passwordConfirm'];
      }
    });

    this.userForm.get('sms').valueChanges.subscribe(value => {
      const phoneField = this.userForm.controls['phone'];
      const tokenField = this.userForm.controls['token'];
      if (value === 'yes') {
        this.phoneRequired = true;
        phoneField.setValidators(Validators.compose([Validators.required, Validators.pattern(/[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}/)]));
        phoneField.updateValueAndValidity();
        tokenField.setValidators(Validators.compose([Validators.required, Validators.pattern(/^abc123$/)]));
        tokenField.updateValueAndValidity();
      }
      else if (value === 'no') {
        this.phoneRequired = false;
        phoneField.setValidators(Validators.compose([Validators.pattern(/[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}/)]));
        phoneField.updateValueAndValidity();
        tokenField.setValidators(Validators.compose([ Validators.pattern(/^abc123$/)]));
        tokenField.updateValueAndValidity();
      }
    });


  }

  populateTestData(){
    this.userForm.patchValue({
      email: 'jkowal@wp.pl',
      username: 'jkowal'
    });
  }


}
