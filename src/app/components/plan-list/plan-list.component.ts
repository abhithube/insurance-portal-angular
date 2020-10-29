import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

import { Plan } from 'src/app/models/plan';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
})
export class PlanListComponent implements OnInit {
  plans: Plan[];
  params: Params;

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((res: Plan[]) => (this.plans = res));

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => (this.params = params)
    );
  }

  selectPlan(plan: Plan): void {
    this.authService.getUsername().then((username: string) => {
      if (!username) {
        this.router.navigate(['/plans'], {
          queryParams: { unauthenticated: true },
        });
        return;
      }

      this.memberService.getMember(username).subscribe((member: Member) => {
        if (member.plan) {
          this.router.navigate(['/plans'], {
            queryParams: { enrolled: true },
          });
        } else {
          this.router.navigate(['/payment'], {
            queryParams: { plan: plan.id },
          });
        }
      });
    });
  }
}
