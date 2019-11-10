import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Training } from '../models/training';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    constructor(private http: HttpClient) { }

    createTraining(training: Training) {
        return this.http.post(`${environment.apiBaseUrl}/training`, training).toPromise();
    }

    getTrainings() {
        return this.http.get(`${environment.apiBaseUrl}/training`).toPromise();
    }

    removeTraining(id: string) {
        return this.http.delete(`${environment.apiBaseUrl}/training/${id}`).toPromise();
    }

    updateTraining(id: string, training: Training) {
        return this.http.put(`${environment.apiBaseUrl}/training/${id}`, training).toPromise();
    }
}
