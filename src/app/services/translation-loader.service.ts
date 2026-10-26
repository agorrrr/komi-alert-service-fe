import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  constructor(private translate: TranslateService) {}

  loadTranslations() {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');
    
    
    
    
    
  }
}
