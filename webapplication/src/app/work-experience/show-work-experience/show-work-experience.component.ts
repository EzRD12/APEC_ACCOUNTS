import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../../../models/work-experience';
import { WorkExperienceService } from '../../../services/work-experience.service';

@Component({
  selector: 'app-show-work-experience',
  templateUrl: './show-work-experience.component.html',
  styleUrls: ['./show-work-experience.component.css']
})
export class ShowWorkExperienceComponent implements OnInit {

  workExperiences: WorkExperience[] = [];
  visible = false;
  displayData = [ ...this.workExperiences ];
  searchValue = '';

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit() { 
    this.showData();
    this.workExperienceService.currentWorkExperiences.subscribe(work => {
      this.workExperiences = work || [];
    });
  } 

  showData(){
    this.workExperienceService.currentWorkExperiences.subscribe(work =>{
      this.workExperiences = work;
      this.displayData = this.workExperiences;
    });
    // this.workExperienceService.getWorkExperiences().then((data: WorkExperience[]) => {
    //   this.workExperiences = data;
    //   this.displayData = [...this.workExperiences];
    // }).catch((error) => console.log(error));
  }

  onDelete(company: string, occupiedPosition: string){
    console.log({Antes: this.workExperiences});
    this.workExperiences = this.workExperiences.filter(value => value.company !== company 
      && value.occupiedPosition !== occupiedPosition);
    console.log({Despues: this.workExperiences});
    this.workExperienceService.setWorkExperiences(this.workExperiences);
    // this.workExperienceService.removeWorkExperiences(id).then((data) => {
    //   console.log(data);
    // }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.company !== company && value.occupiedPosition !== occupiedPosition)
  }

  search() {
    this.displayData = this.workExperiences.filter(workExperience => {
      return Object.keys(workExperience).some(keys => workExperience[keys] != null &&
        workExperience[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}
