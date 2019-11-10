import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  candidates: Candidate[] = [];
  visible = false;
  displayData = [ ...this.candidates ];
  searchValue = '';

  constructor(private candidateService: CandidateService) { }

  ngOnInit() { 
    this.showData();
  } 

  showData(){
    this.candidateService.getCandidates().then((data: Candidate[]) => {
      this.candidates = data;
      this.displayData = [...this.candidates];
    }).catch((error) => console.log(error));
  }

  onDelete(id: string){
    this.candidateService.removeCandidate(id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.id !== id)
  }

  search() {
    this.displayData = this.candidates.filter(students => {
      return Object.keys(students).some(keys => students[keys] != null &&
        students[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}
