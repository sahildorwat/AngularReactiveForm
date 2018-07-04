import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserName = ['sahil', 'akshay'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenUname.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log( this.signUpForm);
  }
  onAdd() {
    const newfc = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(newfc);
  }

  forbiddenUname (control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return {'forbiddentUname': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(( resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            return resolve({'forbiddenEmail': true});
          } else {
            return resolve(null);
          }
        } , 1500);
     });
     return promise;
  }
}
