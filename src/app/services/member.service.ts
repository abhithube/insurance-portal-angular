import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string =
    'https://app.at-insurance.com/member-details-service/members/';

  constructor(private httpClient: HttpClient) {}

  getMember(username: string): Observable<any> {
    return this.httpClient.get<Member>(this.baseUrl + username);
  }

  updateMember(member: Member): Observable<any> {
    return this.httpClient.put(this.baseUrl + member.username, member);
  }
}
