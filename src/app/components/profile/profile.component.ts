import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Member } from 'src/app/models/member';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  member: Member;
  params: Params;

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getUsername().then((username: string) => {
      this.memberService
        .getMember(username)
        .subscribe((member: Member) => (this.member = member));
    });

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => (this.params = params)
    );
  }

  onClick(): void {
    this.enrollmentService
      .cancelSubscription(this.member.username)
      .subscribe(() => {
        this.router.navigate(['/profile'], {
          queryParams: { cancelled: 'true' },
        });

        this.ngOnInit();
      });
  }
}
