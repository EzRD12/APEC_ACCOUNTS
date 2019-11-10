import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { WorkExperienceService } from '../../../services/work-experience.service';
import { WorkExperience } from '../../../models/work-experience';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-work-experience',
  templateUrl: './create-work-experience.component.html',
  styleUrls: ['./create-work-experience.component.css']
})
export class CreateWorkExperienceComponent implements OnInit {

  validateForm: FormGroup;
  workExperiences: WorkExperience[] = [];

  isValidDate: boolean = true;

  constructor(private fb: FormBuilder, private workExperienceService: WorkExperienceService) {
    this.validateForm = this.fb.group({
      company: ['', [Validators.required], [this.userNameAsyncValidator]],
      occupiedPosition: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      salary: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.workExperienceService.currentWorkExperiences.subscribe(work => {
      this.workExperiences = work || [];
    });
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    const workExperience: WorkExperience = {
      company: value.company,
      occupiedPosition: value.occupiedPosition,
      dateFrom: value.dateFrom,
      dateTo: value.dateTo,
      salary: value.salary
    };

    console.log({ Recien_Creada: workExperience });

    this.dateTimeValidator(workExperience.dateFrom, workExperience.dateTo)

    if (this.isValidDate) {
      this.workExperiences.push(workExperience);
      this.workExperienceService.setWorkExperiences(this.workExperiences);
      console.log({ Experiencia_Despues: this.workExperiences });

      this.validateForm.reset();
    }

    // this.workExperienceService.createWorkExperience(workExperience)
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error));
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

  dateTimeValidator(start: Date, end: Date) {
    if (start > end) {
      this.isValidDate = false;
    } else {
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
