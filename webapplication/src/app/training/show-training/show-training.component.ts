import { Component, OnInit } from '@angular/core';
import { Training } from '../../../models/training';
import { TrainingService } from '../../../services/training.service';

@Component({
  selector: 'app-show-training',
  templateUrl: './show-training.component.html',
  styleUrls: ['./show-training.component.css']
})
export class ShowTrainingComponent implements OnInit {

  trainings: Training[] = [];
  visible = false;
  displayData = [ ...this.trainings ];
  searchValue = '';

  constructor(private trainingService: TrainingService) { }

  ngOnInit() { 
    this.showData();
  } 

  showData(){
    this.trainingService.getTrainings().then((data: Training[]) => {
      this.trainings = data;
      this.displayData = [...this.trainings];
    }).catch((error) => console.log(error));
  }

  onDelete(id: string){
    this.trainingService.removeTraining(id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.id !== id)
  }

  search() {
    this.displayData = this.trainings.filter(training => {
      return Object.keys(training).some(keys => training[keys] != null &&
        training[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}
