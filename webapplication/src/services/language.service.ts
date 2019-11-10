import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Language } from '../models/language';
import { LanguageStatus } from '../enums/languageStatus';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private http: HttpClient) { }

    createLanguage(language: Language) {
        return this.http.post(`${environment.apiBaseUrl}/language`, language).toPromise();
    }

    getLanguages() {
        return this.http.get(`${environment.apiBaseUrl}/language`).toPromise();
    }

    removeLanguage(id: string) {
        return this.http.delete(`${environment.apiBaseUrl}/language/${id}`).toPromise();
    }

    updateLanguage(id: string, language: { name: string, status: LanguageStatus }) {
        return this.http.put(`${environment.apiBaseUrl}/language/${id}`, language).toPromise();
    }
}
