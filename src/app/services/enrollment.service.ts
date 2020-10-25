import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  baseUrl: string = 'https://at-insurance.com/api/v1/enrollment/';
  
  constructor(private httpClient: HttpClient) {}

  createSubscription(enrollmentRequest: EnrollmentRequest): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'create', enrollmentRequest, {
      responseType: 'text',
    });
  }

  cancelSubscription(username: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'cancel', username, {
      responseType: 'text',
    });
  }
}

export interface EnrollmentRequest {
  sourceId: String;
  username: string;
  plan: Plan;
}
