import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
// import {KrakatoaService} from 'src/app/services/krakatoa/krakatoa.service';
import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { EnvService } from 'src/app/services/env/env.service';
import { CryptoService } from 'src/app/services/encrypt/crypt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  lang: string = localStorage.getItem('lang') || 'id';
  hitApiFailed: any;

  constructor(
    public router: Router,
    // readonly _krakatoaService: KrakatoaService,
    readonly alertModalService: AlertModalService,
    readonly alertService: AlertService,
    readonly _env: EnvService,
    readonly metadataService: MetadataService,
    readonly translate: TranslateService,
    readonly cryptoService: CryptoService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const cookie = this.getCookie('x-cookie');
    const token = localStorage.getItem('jwt_token');

    let headers: any = {
      lang: this.lang == 'id' ? 'ID' : 'EN',
    };

    if (cookie) {
      headers['x-cookie'] = `x-cookie=${cookie}`;
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    request = request.clone({
      setHeaders: headers,
    });
    const modifiedRequest = request.clone();

    const timeoutValue = 65000;

    return next.handle(modifiedRequest).pipe(
      timeout(timeoutValue),
      catchError((error: any) => {
        const isIFrame = this.metadataService.getIsIFrame();
        let message = '';
        this.hitApiFailed = this.metadataService.getHitApiFailed();
        switch (error.status) {
          case 0:
            this.alertService.showErrorCustom(
              this.translate.instant('Server Disconnect'),
            );
            break;
          case 404:
            this.alertService.showErrorCustom('404 Not Found');
            break;
          case 401:
            if (isIFrame) {
              this.alertModalService.showAlert('Your Session is Expired!');
            } else {
              this.hitApiFailed = this.hitApiFailed += 1;
              this.metadataService.setHitApiFailed(this.hitApiFailed);

              const param: any = {
                status: 401,
                message: 'Your Session is Expired!',
              };
              // this.router.navigate(['/unauthorized', this.cryptoService.encryptObject(param)]);

              // this._krakatoaService.logoutRegular().subscribe((data: any) => {
              //   this._krakatoaService.emitLogoff();
              // });
              setTimeout(() => {
                // window.location.href = `${this._env.pageUrl}/auth/login`;
              }, 400444444440);
            }
            break;
          case 403:
            if (isIFrame) {
              this.alertModalService.showAlert('Your Session is Expired!');
            } else {
              // this._krakatoaService.logoutRegular().subscribe((data: any) => {
              //   // this._krakatoaService.emitLogoff();
              // });
              // setTimeout(() => {
              //   window.location.href = `${this._env.pageUrl}/auth/login`;
              // }, 3000);
            }
            break;
          case 500:
            let isWarn = false;
            if (
              error.error?.msg?.responseMessage ||
              error.error?.msg?.message
            ) {
              message =
                error?.error?.msg?.responseMessage || error.error?.msg?.message;
            } else if (
              error.error.msg?.message === 'Another Data need approve'
            ) {
              isWarn = true;
              message = error?.error?.msg?.message;
            } else if (typeof error.error?.msg === 'string') {
              message = error.error.msg;
            } else {
              message = this.translate.instant('Server Disconnect');
            }
            isWarn
              ? this.alertService.showWarnCustom(
                  this.translate.instant(message),
                )
              : this.alertService.showErrorCustom(
                  this.translate.instant(message),
                );
            break;
          default:
            if (error.name === 'TimeoutError') {
              this.alertService.showErrorCustom(
                this.translate.instant('Request Time Out'),
              );
            } else {
              return throwError(() => error);
            }
        }

        return throwError(() => error);
      }),
    );
  }

  private getCookie(name: string): string | null {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
}
