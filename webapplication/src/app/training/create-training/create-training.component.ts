import { Component, OnInit } from '@angular/core';
import { TrainingLevel } from '../../../enums/trainingLevel';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { TrainingService } from '../../../services/training.service';
import { Training } from '../../../models/training';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {

  level: TrainingLevel = TrainingLevel.Grade;
  levels: string[] = [];
  validateForm: FormGroup;

  isValidDate: boolean = true;

  constructor(private fb: FormBuilder, private trainingService: TrainingService) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      institution: ['', [Validators.required]],
      startDateTime: ['', [Validators.required]],
      endDateTime: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getTrainingLevels();
  }

  onSelect(level: string){
    if(level === 'Grade'){
      this.level = TrainingLevel.Grade;
    }else if(level === 'PostGrade'){
      this.level = TrainingLevel.PostGrade;
    }else if(level === 'Masters'){
      this.level = TrainingLevel.Masters;
    }else if(level === 'Doctorate'){
      this.level = TrainingLevel.Doctorate;
    }else if(level === 'Technical'){
      this.level = TrainingLevel.Technical;
    }else if(level === 'Management'){
      this.level = TrainingLevel.Management;
    }
    console.log(this.level);
  }

  getTrainingLevels(){
    this.levels = Object.keys(TrainingLevel).filter(value => !(Number.parseInt(value) > 0));
  }  

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    const training: Training = {
      description: value.userName,
      level: this.level,
      startDateTime: value.startDateTime,
      endDateTime: value.endDateTime,
      institution: value.institution
    };

    this.dateTimeValidator(training.startDateTime, training.endDateTime)

    if(this.isValidDate){
      this.trainingService.createTraining(training).then((data) => console.log(data)).catch((error) => console.log(error));
      this.validateForm.reset();
    }
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

  dateTimeValidator(start: Date, end: Date){
    if(start > end){
      this.isValidDate = false;
    }else{
      this.isValidDate = true;
    }
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
}
