import { Candidate } from '../../../models/candidate';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from '../../../models/employee-model';
import { EmployeeService } from '../../../services/employee.service';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-convert-candidate',
  templateUrl: './convert-candidate.component.html',
  styleUrls: ['./convert-candidate.component.css']
})
export class ConvertCandidateComponent implements OnInit {

  @Input()
  visible: boolean = false;

  candidateId: string = '';
  candidate: Candidate;

  constructor(private employeeService: EmployeeService, private candidateService: CandidateService) { }

  ngOnInit() {
  }

  updateCompetition(mothlySalary: number, email: string) {

    const employeeModel: EmployeeModel = {
      candidate: this.candidate,
      email: email,
      mothlySalary: mothlySalary
    };

    this.employeeService.createEmployee(employeeModel).then((data) => console.log(data))
      .catch((error) => console.log(error));

    this.candidateService.removeCandidate(this.candidate.id).then((data) => console.log(data))
    .catch((error) => console.log(error));

    this.visible = false;
  }

  close(): void {
    this.visible = false;
  }

  open(data: Candidate): void {
    this.visible = true;
    this.candidate = data;
    console.log(data);
  }
}
