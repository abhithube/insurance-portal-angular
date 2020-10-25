import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

import { Plan } from 'src/app/models/plan';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
})
export class PlanListComponent implements OnInit {
  plans: Plan[];
  params: Params;
  username: string = "athube";

  constructor(
    private planService: PlanService,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe(
      (res: Plan[]) => this.plans = res
      );

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => this.params = params
    );
  }

  selectPlan(plan: Plan): void {
    this.memberService
      .getMember(this.username)
      .subscribe((res: Member) => {
        if (res.plan) {
          this.router.navigate(['/plans'], {
            queryParams: { enrolled: true },
          });
        } else {
          this.router.navigate(['/payment'], {
            queryParams: { plan: plan.id },
          });
        }
      });
  }
}
