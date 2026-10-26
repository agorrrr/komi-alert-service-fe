import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/services/encrypt/crypt.service';
@Component({
    selector: 'app-unauthorize-page',
    templateUrl: './unauthorize-page.component.html',
    styleUrls: ['./unauthorize-page.component.scss'],
    standalone: false
})
export class UnauthorizePageComponent {
  receivedData: any;
  constructor(
    private readonly router: Router,
    readonly activeRoute: ActivatedRoute,
    readonly cryptoService: CryptoService
  ){
    this.activeRoute.params.subscribe(params => {
      this.receivedData = this.cryptoService.decryptObject(params['param']);
    });
  }

  backhome(){
    
    this.router.navigate(['home'])
  }
}
