import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string = 'https://at-insurance.com/api/v1/members/';

  constructor(private httpClient: HttpClient) {}

  getMember(username: string): Observable<any> {
    return this.httpClient.get<Member>(this.baseUrl + username);
  }
}