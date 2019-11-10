import { Component, OnInit, Input } from '@angular/core';
import { CompetitionStatus } from '../../../enums/competitionStatus';
import { CompetitionService } from '../../../services/competition.service';
import { Competition } from '../../../models/competition';

@Component({
  selector: 'app-competition-update-drawer',
  templateUrl: './competition-update-drawer.component.html',
  styleUrls: ['./competition-update-drawer.component.css']
})
export class CompetitionUpdateDrawerComponent implements OnInit {

  @Input()
  visible: boolean = false;

  competitionId: string = '';
  status: string[] = [];
  state: CompetitionStatus = CompetitionStatus.Required;

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.getStatusValues();
  }

  getStatusValues() {
    this.status = Object.keys(CompetitionStatus).filter(value => !(Number.parseInt(value) > 0));
  }

  updateCompetition(description: string) {
    const competition: Competition = {
      description: description,
      status: this.state
    };

    this.competitionService.updateCompetition(this.competitionId, competition).then((data) => console.log(data))
    .catch((error) => console.log(error));

    this.visible = false;
  }

  onSelect(state: string) {
    if (state === 'Required') {
      this.state = CompetitionStatus.Required;
    } else {
      this.state = CompetitionStatus.Unrequired;
    }
    console.log(this.state);
  }

  close(): void {
    this.visible = false;
  }

  open(id: string): void {
    this.visible = true;
    this.competitionId = id;
  }
}
