import { computed, inject, Injectable, signal } from '@angular/core';
import { getLanguageFlag } from '../../shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

interface Language {
  lang: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private cookies = inject(CookieService);

  private langs = signal(this.translate.getLangs());

  public currentLang = signal<Language>(this.createLanguage(this.getInitialLang()));

  public availableLangs = computed(() => this.langs().map(this.createLanguage));

  private getInitialLang(): string {
    return this.cookies.get('lang') || this.translate.getBrowserLang() || 'en';
  }

  private createLanguage(lang: string): Language {
    return {
      lang,
      flag: getLanguageFlag(lang),
    };
  }
  public onLanguageChange(lang: string | null): void {
    if (!lang) return;
    this.translate.use(lang);
    this.currentLang.set(this.createLanguage(lang));
    this.cookies.set('lang', lang);
  }
}
