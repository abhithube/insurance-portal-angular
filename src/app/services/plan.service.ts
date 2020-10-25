import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Plan } from '../models/plan';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  baseUrl: string = 'https://at-insurance.com/api/v1/plans/';
  constructor(private httpClient: HttpClient) {}

  getPlans(): Observable<any> {
    return this.httpClient.get<Plan>(this.baseUrl);
  }

  getPlan(id: string): Observable<any> {
    return this.httpClient.get<Plan>(this.baseUrl + id);
  }
}
