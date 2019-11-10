import { Component, OnInit, Input } from '@angular/core';
import { WorkExperienceService } from '../../../services/work-experience.service';
import { WorkExperience } from '../../../models/work-experience';

@Component({
  selector: 'app-work-experience-update-drawer',
  templateUrl: './work-experience-update-drawer.component.html',
  styleUrls: ['./work-experience-update-drawer.component.css']
})
export class WorkExperienceUpdateDrawerComponent implements OnInit {

  @Input()
  visible: boolean = false;

  workExperienceId: string = '';
  occupiedPosition: string = '';
  company: string = '';
  dateFrom: Date;
  dateTo: Date;
  salary: number;

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit() {
  }

  updateWorkExperience(company: string, occupiedPosition: string) {

    const workExperience: WorkExperience = {
      company: company,
      occupiedPosition: occupiedPosition,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      salary: this.salary
    };

    this.workExperienceService.updateWorkExperiences(this.workExperienceId, workExperience).then((data) => console.log(data))
      .catch((error) => console.log(error));

    this.visible = false;
    console.log({ WorkExperience: workExperience });
  }

  close(): void {
    this.visible = false;
  }

  open(id: string): void {
    this.visible = true;
    this.workExperienceId = id;
  }

}
