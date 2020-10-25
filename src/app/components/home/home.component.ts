import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUrl: string = "https://auth.at-insurance.com/login?client_id=72hlki212kapavh4ov2h3jobia&response_type=code&scope=openid&redirect_uri=https://at-insurance.com/oauth2/idpresponse"

  constructor() {}

  ngOnInit(): void {}
}
