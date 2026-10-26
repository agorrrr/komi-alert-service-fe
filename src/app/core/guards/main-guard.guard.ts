import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { KrakatoaService } from '../../services/krakatoa/krakatoa.service';
import { EnvService } from 'src/app/services/env/env.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';

export const mainGuardGuard = (route, state) => {
  // const krakatoa = inject(KrakatoaService);
  const metadata = inject(MetadataService);
  const alertModal = inject(AlertModalService);
  const env = inject(EnvService);
  const translate = inject(TranslateService);

  // return krakatoa.retriveAllAttribute().pipe(
  //   map((res: any) => {
  //     if (res) {
  //       metadata.setMetdata(res.data);
  //       metadata.setgroupRole(res.data);
  //       metadata.setModulesList(res.data);
  //       return true;
  //     } else {
  //       const isIFrame = metadata.getIsIFrame();
  //       if (isIFrame) {
  //         alertModal.showAlert(translate.instant('Your Session is Expired!'));
  //       } else {
  //         window.location.href = `${env.pageUrl}/auth/login`;
  //       }
  //       return false;
  //     }
  //   }),
  //   catchError((error: any) => {
  //     console.error('Error occurred while retrieving attributes:', error);
  //     const isIFrame = metadata.getIsIFrame();
  //     if (isIFrame) {
  //       alertModal.showAlert(translate.instant('Your Session is Expired!'));
  //     } else {
  //       window.location.href = `${env.pageUrl}/auth/login`;
  //     }
  //     return of(false); // sebelumnya kamu return `of(true)`, harusnya `false`
  //   })
  // );
};
