import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  EnrollmentRequest,
  EnrollmentService,
} from 'src/app/services/enrollment.service';
import { PlanService } from 'src/app/services/plan.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit, OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;
  card: any;
  cardErrors: any;

  username: string = "athube";
  plan: Plan;
  enrollmentRequest: EnrollmentRequest;

  loading: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private planService: PlanService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) =>
      this.planService.getPlan(params.plan).subscribe(
        (res: Plan) => this.plan = res
      )
    );
  }

  ngAfterViewInit(): void {
    this.card = elements.create('card', { hidePostalCode: true });
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    this.loading = true;

    const { source, error } = await stripe.createSource(this.card);

    if (error) {
      this.cardErrors = error.message;
    } else {
      this.enrollmentRequest = {
        sourceId: source.id,
        username: this.username,
        plan: this.plan,
      };

      this.enrollmentService
        .createSubscription(this.enrollmentRequest)
        .subscribe(() => {
          this.router.navigate(['/profile'], {
            queryParams: { enrolled: 'true' },
          });

          this.loading = false;
          this.card.clear();
        });
    }
  }
}
