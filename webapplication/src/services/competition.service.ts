import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competition } from '../models/competition';
import { environment } from '../environments/environment.prod';
import { CompetitionStatus } from '../enums/competitionStatus';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  createCompetition(competition: Competition) {
    return this.http.post(`${environment.apiBaseUrl}/competition`, competition).toPromise();
  }

  getCompetitions(){
    return this.http.get(`${environment.apiBaseUrl}/competition`).toPromise();
  }

  removeCompetition(id: string){
    return this.http.delete(`${environment.apiBaseUrl}/competition/${id}`).toPromise();
  }

  updateCompetition(id:string, competition:{description:string, status:CompetitionStatus}){
    return this.http.put(`${environment.apiBaseUrl}/competition/${id}`, competition).toPromise();
  }
}
