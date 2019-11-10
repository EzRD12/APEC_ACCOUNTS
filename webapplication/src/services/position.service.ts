import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Position } from '../models/position';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }

    createPosition(position: Position) {
        return this.http.post(`${environment.apiBaseUrl}/position`, position).toPromise();
    }

    getPositions() {
        return this.http.get(`${environment.apiBaseUrl}/position`).toPromise();
    }

    removePosition(id: string) {
        return this.http.delete(`${environment.apiBaseUrl}/position/${id}`).toPromise();
    }

    updatePosition(id: string, position: Position) {
        return this.http.put(`${environment.apiBaseUrl}/position/${id}`, position).toPromise();
    }
}
