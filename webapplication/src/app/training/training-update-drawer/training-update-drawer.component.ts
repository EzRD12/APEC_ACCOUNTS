import { Component, OnInit, Input } from '@angular/core';
import { TrainingLevel } from '../../../enums/trainingLevel';
import { TrainingService } from '../../../services/training.service';
import { Training } from '../../../models/training';

@Component({
  selector: 'app-training-update-drawer',
  templateUrl: './training-update-drawer.component.html',
  styleUrls: ['./training-update-drawer.component.css']
})
export class TrainingUpdateDrawerComponent implements OnInit {

  @Input()
  visible: boolean = false;

  trainingId: string = '';
  levels: string[] = [];
  level: TrainingLevel = TrainingLevel.Grade;
  startDateTime: Date;
  endDateTime: Date;
  institution: string = '';

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.getLevelsValues();
  }

  getLevelsValues() {
    this.levels = Object.keys(TrainingLevel).filter(value => !(Number.parseInt(value) > 0));
  }

  updateCompetition(description: string) {
    const training: Training = {
      description: description,
      level: this.level,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      institution: this.institution
    };

    this.trainingService.updateTraining(this.trainingId, training).then((data) => console.log(data))
      .catch((error) => console.log(error));

    this.visible = false;
    console.log({training: training});
  }

  onSelect(level: string) {
    if (level === 'Grade') {
      this.level = TrainingLevel.Grade;
    } else if (level === 'PostGrade') {
      this.level = TrainingLevel.PostGrade;
    } else if (level === 'Masters') {
      this.level = TrainingLevel.Masters;
    } else if (level === 'Doctorate') {
      this.level = TrainingLevel.Doctorate;
    } else if (level === 'Technical') {
      this.level = TrainingLevel.Technical;
    } else if (level === 'Management') {
      this.level = TrainingLevel.Management;
    }
    console.log(this.level);
  }

  close(): void {
    this.visible = false;
  }

  open(id: string): void {
    this.visible = true;
    this.trainingId = id;
  }
}
