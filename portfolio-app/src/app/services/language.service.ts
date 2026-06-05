import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);

  currentLang = signal<'en' | 'de'>('en');

  constructor() {
    this.translate.use('en');
    this.currentLang.set('en');
  }

  use(lang: 'en' | 'de') {
    this.currentLang.set(lang);
    this.translate.use(lang);
  }
}
