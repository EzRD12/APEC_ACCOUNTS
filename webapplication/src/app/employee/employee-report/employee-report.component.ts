import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeesByDateModel } from '../../../models/employee-by-date-model';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  validateForm: FormGroup;

  isValidDate: boolean = true;
  isSubmitted: boolean = false;

  employees: Employee[] = [];
  visible = false;
  displayData = [ ...this.employees ];
  searchValue = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.validateForm = this.fb.group({
      startDateTime: ['', [Validators.required]],
      endDateTime: ['', [Validators.required]]
    });
  }

  ngOnInit() { 
  } 

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    const employeeModel: EmployeesByDateModel = {
      startDateTime: value.startDateTime,
      endDateTime: value.endDateTime
    };

    console.log(employeeModel);

    this.dateTimeValidator(employeeModel.startDateTime, employeeModel.endDateTime)

    if(this.isValidDate){
      this.employeeService.getEmployeesByDate(employeeModel).then((data: Employee[]) => {
        this.employees = data;
        console.log(this.employees);
        this.displayData = [...this.employees];
        this.isSubmitted = true;
      }).catch((error) => console.log(error));
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

  importReport(){
    window.print();
  }
}
