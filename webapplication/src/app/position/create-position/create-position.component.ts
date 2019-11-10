import { Component, OnInit } from '@angular/core';
import { PositionRiskLevel } from '../../../enums/PositionRiskLevel';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { PositionService } from '../../../services/position.service';
import { PositionStatus } from '../../../enums/positionStatus';
import { Position } from '../../../models/position';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {

  state: PositionStatus = PositionStatus.Approved;
  status: string[] = []
  riskLevel: PositionRiskLevel = PositionRiskLevel.High;
  riskLevels: string[] = [];
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private positionService: PositionService) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      minimumSalary: ['', [Validators.required]],
      maximumSalary: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getPositionRiskLevels();
    this.getPositionStatus();
  }

  onSelectRiskLevel(riskLevel: string) {
    if (riskLevel === 'High') {
      this.riskLevel = PositionRiskLevel.High;
    } else if (riskLevel === 'Intermediate') {
      this.riskLevel = PositionRiskLevel.Intermediate;
    } else if (riskLevel === 'Low') {
      this.riskLevel = PositionRiskLevel.Low;
    }
    console.log(this.riskLevel);
  }

  onSelectStatus(state: string) {
    if (state === 'Approved') {
      this.state = PositionStatus.Approved;
    } else {
      this.state = PositionStatus.Disapproved;
    }
    console.log(this.state);
  }

  getPositionRiskLevels() {
    this.riskLevels = Object.keys(PositionRiskLevel).filter(value => !(Number.parseInt(value) > 0));
  }

  getPositionStatus() {
    this.status = Object.keys(PositionStatus).filter(value => !(Number.parseInt(value) > 0));
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    const position: Position = {
      name: value.userName,
      maximumSalary: value.maximumSalary,
      minimumSalary: value.minimumSalary,
      riskLevel: this.riskLevel,
      status: this.state
    };
    
    console.log(position);

    this.positionService.createPosition(position).then((data) => console.log(data)).catch((error) => console.log(error));
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
