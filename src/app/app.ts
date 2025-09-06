import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { MatrixComponent } from '@shared/components/matrix/matrix.component';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { RouterService } from '@core/services/router.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, MatrixComponent, LanguageSwitcherComponent],
  templateUrl: './app.html',
})
export class App {
  private routerService = inject(RouterService);

  public isItemActive = this.routerService.isItemActive;

  protected readonly title = signal('portfolio');
}
