import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { CandidateService } from '../../../services/candidate.service';
import { Observable, Observer } from 'rxjs';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position';
import { Candidate } from '../../../models/candidate';
import { TrainingService } from '../../../services/training.service';
import { Training } from '../../../models/training';
import { TrainingLevel } from '../../../enums/trainingLevel';
import { WorkExperienceService } from '../../../services/work-experience.service';
import { WorkExperience } from '../../../models/work-experience';
import { CompetitionService } from '../../../services/competition.service';
import { Competition } from '../../../models/competition';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {

  validateForm: FormGroup;
  
  positions: Position[] = [];
  displayPositions: string[] = [];
  currentPosition: Position;

  trainings: Training[] = [];
  displayTrainings: string[] = [];
  currentTrainings: Training[] = [];

  competitions: Competition[] = [];
  displayCompetitions: string[] = [];
  currentCompetitions: Competition[] = [];

  workExperiences: WorkExperience[] = [];

  constructor(private fb: FormBuilder, 
    private candidateService: CandidateService,
    private positionService: PositionService,
    private trainingService: TrainingService,
    private workExperienceService: WorkExperienceService,
    private competitionService: CompetitionService
  ) {
    this.validateForm = this.fb.group({
      identification: ['', [Validators.required], [this.userNameAsyncValidator]],
      name: ['', [Validators.required], [this.userNameAsyncValidator]],
      department: ['', [Validators.required], [this.userNameAsyncValidator]],
      salary: ['', [Validators.required]],
      recommendBy: ['', [Validators.required], [this.userNameAsyncValidator]]
    });
  }

  ngOnInit() {
    this.getPositions();
    this.getTrainings();
    this.getWorkExperiences();
    this.getCompetitions();
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    let candidate: Candidate = {
      identification: value.identification,
      name: value.name,
      department: value.department,
      aspiratedSalary: value.salary,
      positionId: this.currentPosition.id,
      trainings: this.currentTrainings,
      workExperiences: this.workExperiences,
      recommendBy: value.recommendBy,
      competitions: this.currentCompetitions
    };

    this.candidateService.createCandidate(candidate).then((data) => console.log(data)).catch((error) => console.log(error));
    this.validateForm.reset();
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value.length < 3) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getPositions(){
    this.positionService.getPositions().then((data: Position[]) => {
      this.positions = data;
      this.displayPositions = this.positions.map((value: Position) => value.name)
      console.log({Posiciones: this.positions});
    }).catch((error) => console.log(error));
  }

  onSelectPosition(selectedPosition: string){
    this.currentPosition = this.positions.find((value: Position) => value.name == selectedPosition);
    console.log({Posicion_actual: this.currentPosition});
  }

  getTrainings(){
    this.trainingService.getTrainings().then((data: Training[]) => {
      this.trainings = data;
      this.displayTrainings = this.trainings.map((value: Training) => value.description)
      console.log({Trainings: this.trainings});
    });
  }

  onSelectTraining(description: string){
    var selectedTraining = this.trainings.find((value: Training) => value.description == description);

    if(this.currentTrainings.some(value => value.description == selectedTraining.description)){
      this.currentTrainings = this.currentTrainings.filter(value => value.description !== selectedTraining.description);
    }else{
      this.currentTrainings.push(selectedTraining);
    }

    console.log({Training_actual: this.currentTrainings});
  }

  getWorkExperiences(){
    this.workExperienceService.currentWorkExperiences.subscribe((data) => {
      this.workExperiences.concat(data);
    })
  }

  getCompetitions(){
    this.competitionService.getCompetitions().then((data: Competition[]) => {
      this.competitions = data;
      this.displayCompetitions = this.competitions.map((value: Competition) => value.description)
      console.log({Competencias: this.competitions});
    });
  }

  onSelectCompetition(description: string){
    var selectedCompetition = this.competitions.find((value: Competition) => value.description == description);

    if(this.currentCompetitions.some(value => value.description == selectedCompetition.description)){
      this.currentCompetitions = this.currentCompetitions.filter(value => value.description !== selectedCompetition.description);
    }else{
      this.currentCompetitions.push(selectedCompetition);
    }

    console.log({Competencia_actual: this.currentCompetitions});
  }

}
