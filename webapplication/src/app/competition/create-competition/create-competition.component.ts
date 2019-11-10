import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observer, Observable } from 'rxjs';
import { CompetitionStatus } from '../../../enums/competitionStatus';
import { CompetitionService } from '../../../services/competition.service';
import { Competition } from '../../../models/competition';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent implements OnInit {

  state: CompetitionStatus = CompetitionStatus.Required;
  status: string[] = [];
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private competitionService: CompetitionService) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
    });
  }

  ngOnInit() {
    this.getStatusValues();
  }

  onSelect(state: string){
    if(state === 'Required'){
      this.state = CompetitionStatus.Required;
    }else{
      this.state = CompetitionStatus.Unrequired;
    }
    console.log(this.state);
  }

  getStatusValues(){
    this.status = Object.keys(CompetitionStatus).filter(value => !(Number.parseInt(value) > 0));
  }  

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    const competition: Competition = {
      description: value.userName,
      status: this.state
    };

    this.competitionService.createCompetition(competition).then((data) => console.log(data)).catch((error) => console.log(error));
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
