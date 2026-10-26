import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EnvService } from 'src/app/services/env/env.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil, finalize } from 'rxjs';

interface LoginPayload {
  credential: string;
  secret: string;
}

interface AppConfig {
  header_app: string;
  footer_app: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SigninPageComponent implements OnInit, OnDestroy {
  isFetching = false;
  imgPath = '';
  appObjectTmp?: AppConfig; // Add this property
  private destroy$ = new Subject<void>();

  loginForm = this._fb.group({
    userid: ['', Validators.required],
    secret: ['', Validators.required],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly _router: Router,
    private readonly _authservice: AuthService,
    private readonly _env: EnvService,
    private readonly titleService: Title,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    this.imgPath = `${this._env.pageUrl}/assets/images/fds-logo.png`;
    this.titleService.setTitle('Sign In');

    // Initialize app config - adjust these values as needed
    this.appObjectTmp = {
      header_app: 'Please sign in to continue',
      footer_app: 'Version 1.0.0',
    };
  }

  onSubmit(): void {
    if (!this.loginForm.valid || this.isFetching) return;
    this.performLogin(false);
  }

  private performLogin(forceLogin = false): void {
    this.isFetching = true;
    const payload = this.buildLoginPayload(forceLogin);
    this._authservice
      .loginLocal(payload)
      .pipe(
        finalize(() => {
          this.isFetching = false;
          this.cdr.markForCheck();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => this.handleLocalLoginResponse(data),
        error: (error) => this.handleLoginError(error),
      });
  }

  private handleLocalLoginResponse(response: any): void {
    const { token, user } = response.data;

    // Store token
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));

    // Emit user info to service
    this._authservice.emitLayout({ status: 200, data: user });

    // Navigate to home
    this._router.navigateByUrl('');
  }

  private buildLoginPayload(forceLogin: boolean): LoginPayload {
    const { userid = '', secret = '' } = this.loginForm.value;
    return {
      credential: userid,
      secret: secret,
    };
  }

  private handleLoginError(error: any): void {
    const message = error?.error?.message || error?.message || 'Login failed';

    this.showMessage('error', 'Error', message);
    this.cdr.markForCheck();
  }

  private showMessage(severity: string, title: string, detail: string): void {
    this.messageService.add({
      key: 'tc',
      severity,
      summary: title,
      detail,
      closable: false,
      life: 4000,
    });
  }

  forgotpassword(event: Event): void {
    event.preventDefault();
    this._router.navigate(['/auth/forgot-password']);
  }
}
