import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'shared-nav-bar',
  imports: [RouterModule, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  protected readonly navItems = [
    { label: 'nav-bar.home', route: '/' },
    { label: 'nav-bar.about', route: '/about' },
    { label: 'nav-bar.projects', route: '/projects' },
    { label: 'nav-bar.skills', route: '/skills' },
    { label: 'nav-bar.contact', route: '/contact' },
  ];
}
