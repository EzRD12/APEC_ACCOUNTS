import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { WorkExperience } from '../models/work-experience';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkExperienceService {

    private workExperiences: BehaviorSubject<WorkExperience[]> = new BehaviorSubject(null);
    currentWorkExperiences = this.workExperiences.asObservable();

    constructor(private http: HttpClient) { }

    createWorkExperience(workExperience: WorkExperience) {
        return this.http.post(`${environment.apiBaseUrl}/work-experience`, workExperience).toPromise();
    }

    getWorkExperiences() {
        return this.http.get(`${environment.apiBaseUrl}/work-experience`).toPromise();
    }

    removeWorkExperiences(id: string) {
        return this.http.delete(`${environment.apiBaseUrl}/work-experience/${id}`).toPromise();
    }

    updateWorkExperiences(id: string, workExperience: WorkExperience) {
        return this.http.put(`${environment.apiBaseUrl}/work-experience/${id}`, workExperience).toPromise();
    }

    setWorkExperiences(workExperiences: WorkExperience[]){
        this.workExperiences.next(workExperiences);
    }
}
