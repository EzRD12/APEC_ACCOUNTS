import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { CompetitionStatus } from '../enums/competitionStatus';
import { EmployeeModel } from '../models/employee-model';
import { EmployeesByDateModel } from '../models/employee-by-date-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createEmployee(employeeModel: EmployeeModel) {
    return this.http.post(`${environment.apiBaseUrl}/employee`, employeeModel).toPromise();
  }

  getEmployeesByDate(dates: EmployeesByDateModel){
    return this.http.post(`${environment.apiBaseUrl}/employee/report`, dates).toPromise();
  }

  // removeCompetition(id: string){
  //   return this.http.delete(`${environment.apiBaseUrl}/employee/${id}`).toPromise();
  // }

  // updateCompetition(id:string, competition:{description:string, status:CompetitionStatus}){
  //   return this.http.put(`${environment.apiBaseUrl}/employee/${id}`, competition).toPromise();
  // }
}
