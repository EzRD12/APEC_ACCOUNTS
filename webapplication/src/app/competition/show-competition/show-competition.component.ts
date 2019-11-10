import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { Competition } from '../../../models/competition';

@Component({
  selector: 'app-show-competition',
  templateUrl: './show-competition.component.html',
  styleUrls: ['./show-competition.component.css']
})
export class ShowCompetitionComponent implements OnInit {

  competitions: Competition[] = [];
  visible = false;
  displayData = [ ...this.competitions ];
  searchValue = '';

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() { 
    this.showData();
  } 

  showData(){
    this.competitionService.getCompetitions().then((data: Competition[]) => {
      this.competitions = data;
      this.displayData = [...this.competitions];
    }).catch((error) => console.log(error));
  }

  onDelete(id: string){
    this.competitionService.removeCompetition(id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.id !== id)
  }

  search() {
    this.displayData = this.competitions.filter(students => {
      return Object.keys(students).some(keys => students[keys] != null &&
        students[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}
