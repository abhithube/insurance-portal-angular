import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  params: Params;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.activatedRoute.queryParams.subscribe(
      (params) => (this.params = params)
    );
  }

  onSubmit(): void {
    const username = this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.authService
      .register(username, email, password)
      .then((success: boolean) => {
        if (success) {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' },
          });
        } else {
          this.router.navigate(['/register'], {
            queryParams: { invalid: 'true' },
          });
        }
      });
  }
}
