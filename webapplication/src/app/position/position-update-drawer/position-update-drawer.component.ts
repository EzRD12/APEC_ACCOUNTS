import { Component, OnInit, Input } from '@angular/core';
import { PositionStatus } from '../../../enums/positionStatus';
import { PositionRiskLevel } from '../../../enums/PositionRiskLevel';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position';

@Component({
  selector: 'app-position-update-drawer',
  templateUrl: './position-update-drawer.component.html',
  styleUrls: ['./position-update-drawer.component.css']
})
export class PositionUpdateDrawerComponent implements OnInit {


  @Input()
  visible: boolean = false;

  positionId: string = '';
  state: PositionStatus = PositionStatus.Approved;
  status: string[] = []
  riskLevel: PositionRiskLevel = PositionRiskLevel.High;
  riskLevels: string[] = [];
  maximumSalary: number;
  minimumSalary: number;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.getPositionRiskLevels();
    this.getPositionStatus();
  }

  getPositionRiskLevels() {
    this.riskLevels = Object.keys(PositionRiskLevel).filter(value => !(Number.parseInt(value) > 0));
  }

  getPositionStatus() {
    this.status = Object.keys(PositionStatus).filter(value => !(Number.parseInt(value) > 0));
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

  updateCompetition(name: string) {
    const position: Position = {
      maximumSalary: this.maximumSalary,
      minimumSalary: this.minimumSalary,
      name: name,
      riskLevel: this.riskLevel,
      status: this.state
    };

    this.positionService.updatePosition(this.positionId, position).then((data) => console.log(data))
      .catch((error) => console.log(error));

    this.visible = false;
  }

  close(): void {
    this.visible = false;
  }

  open(id: string): void {
    this.visible = true;
    this.positionId = id;
  }
}
