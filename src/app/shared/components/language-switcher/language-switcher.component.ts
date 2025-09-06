import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private language = inject(LanguageService);

  public currentLang = computed(() => this.language.currentLang());
  public availableLangs = computed(() => this.language.availableLangs());

  public onLanguageChange(lang: string | null) {
    this.language.onLanguageChange(lang);
  }
}
