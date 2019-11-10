import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageStatus } from '../../../enums/languageStatus';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Language } from '../../../models/language';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.css']
})
export class CreateLanguageComponent implements OnInit {

  state: LanguageStatus = LanguageStatus.Required;
  status: string[] = [];
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private languageService: LanguageService) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
    });
  }

  ngOnInit() {
    this.getStatusValues();
  }

  onSelect(state: string){
    if(state === 'Required'){
      this.state = LanguageStatus.Required;
    }else{
      this.state = LanguageStatus.Unrequired;
    }
    console.log(this.state);
  }

  getStatusValues(){
    this.status = Object.keys(LanguageStatus).filter(value => !(Number.parseInt(value) > 0));
  }  

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    const language: Language = {
      name: value.userName,
      status: this.state
    };

    this.languageService.createLanguage(language).then((data) => console.log(data)).catch((error) => console.log(error));
    this.validateForm.reset();
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value.length < 3) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
}
