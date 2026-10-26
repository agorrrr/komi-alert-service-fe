import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { EnvService } from './services/env/env.service';
import { MetadataService } from './services/metadata/metadata.service';

import { ConsoleLoggerService } from './services/common/console-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  config: string = '';
  messageReceived: string = '';
  @Input() receivedMessage: string = '';
  title = 'Tutor_One';

  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly _elementRef: ElementRef,
    readonly translateService: TranslateService,
    readonly _env: EnvService,
    // readonly _krakatoaService: KrakatoaService,
    readonly _consoleLogService: ConsoleLoggerService,
    readonly metadataService: MetadataService,
  ) {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  receiveMessage(event: MessageEvent) {
    const { succesLogin } = event.data;

    if (succesLogin) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000);
    }
  }

  checkQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.otp) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000);
        const cookieAttributes = `expires=${expirationDate.toUTCString()};`;
        document.cookie = `x-cookie=${params.otp}; ${cookieAttributes}`;

        // this._krakatoaService.retriveAllAttribute().subscribe((res: any) => {
        //   this.metadataService.setMetdata(res.data);
        //   this.metadataService.setgroupRole(res.data);
        //   this.metadataService.setModulesList(res.data);

        //   let updatedExpirationDate = new Date();
        //   if (
        //     res.data.expireToken != undefined &&
        //     res.data.expireToken != null
        //   ) {
        //     updatedExpirationDate.setTime(
        //       updatedExpirationDate.getTime() + parseInt(res.data.expireToken) * 1000
        //     );
        //   }
        //   const updatedCookieAttributes = `expires=${updatedExpirationDate.toUTCString()};`;
        //   document.cookie = `x-cookie=${params.otp}; ${updatedCookieAttributes}`;
        // });
      }
    });
  }

  checkIFrameCondition() {
    let isIFrame = window.self !== window.top;
    this.metadataService.setIsIFrame(isIFrame);
  }

  ngOnInit(): void {
    this.config = this.route.snapshot.params['config'];
    this._elementRef.nativeElement.removeAttribute('ng-version');
    if (!this._env.apiUrl.toString().includes('bni.co.id')) {
      this.checkQueryParams();
    }
    this.checkIFrameCondition();
  }
}
