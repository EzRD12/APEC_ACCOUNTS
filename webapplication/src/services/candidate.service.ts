import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  createCandidate(candidate: Candidate) {
    return this.http.post(`${environment.apiBaseUrl}/candidate`, candidate).toPromise();
  }

  getCandidates(){
    return this.http.get(`${environment.apiBaseUrl}/candidate`).toPromise();
  }

  removeCandidate(id: string){
    return this.http.delete(`${environment.apiBaseUrl}/candidate/${id}`).toPromise();
  }

  updateCandidate(id:string, candidate:{description:string}){
    return this.http.put(`${environment.apiBaseUrl}/candidate/${id}`, candidate).toPromise();
  }
}
