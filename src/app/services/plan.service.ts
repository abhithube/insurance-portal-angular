import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  baseUrl: string = 'https://at-insurance.com/plan-details-service/plans/';
  constructor(private httpClient: HttpClient) {}

  getPlans(): Observable<any> {
    return this.httpClient.get<Plan>(this.baseUrl);
  }

  getPlan(id: string): Observable<any> {
    return this.httpClient.get<Plan>(this.baseUrl + id);
  }
}
