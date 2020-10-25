import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Member } from 'src/app/models/member';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  member: Member;
  params: Params;
  username: string = "athube";

  constructor(
    private memberService: MemberService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.memberService
      .getMember(this.username).subscribe(
        (res: Member) => this.member = res
      );

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => (this.params = params)
    );
  }

  onClick(): void {
    this.enrollmentService
      .cancelSubscription(this.username)
      .subscribe(() => {
        this.router.navigate(['/profile'], {
          queryParams: { cancelled: 'true' },
        });

        this.ngOnInit();
      });
  }
}
