import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getAccounting(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/account-entry`).toPromise();
  }

  getCurrencyTypes(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/currency`).toPromise();
  }

  storeAccounting(request): Promise<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/account-entry`, request).toPromise();
  }

  deleteAccounting(entryId): Promise<any> {
    return this.http.delete(`${environment.apiBaseUrl}/account-entry/${entryId}`).toPromise();
  }

  getActiveAuxiliaryAccounts(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/auxiliary-accounts/active`).toPromise();
  }
}
