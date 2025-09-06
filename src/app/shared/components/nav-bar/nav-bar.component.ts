import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterService } from '@core/services/router.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAcademicCap,
  heroBriefcase,
  heroEnvelopeOpen,
  heroHome,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'shared-nav-bar',
  imports: [CommonModule, RouterModule, TranslatePipe, NgIcon],
  viewProviders: [
    provideIcons({ heroHome, heroUser, heroBriefcase, heroAcademicCap, heroEnvelopeOpen }),
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  private routerService = inject(RouterService);

  public showMenu = signal<boolean>(false);

  protected readonly navItems = [
    { label: 'nav-bar.home', route: '/', icon: 'heroHome' },
    { label: 'nav-bar.about', route: '/about', icon: 'heroUser' },
    { label: 'nav-bar.projects', route: '/projects', icon: 'heroBriefcase' },
    { label: 'nav-bar.skills', route: '/skills', icon: 'heroAcademicCap' },
    { label: 'nav-bar.contact', route: '/contact', icon: 'heroEnvelopeOpen' },
  ];

  toggleMenu(): void {
    this.showMenu.update((prev) => {
      const next = !prev;

      if (next && !this.routerService.isItemActive()) {
        this.showRouterOutlet();
      }

      if (!next) {
        this.hideRouterOutlet();
      }

      return next;
    });
  }

  showRouterOutlet(): void {
    this.routerService.showRouterOutlet();
  }

  hideRouterOutlet(): void {
    if (this.routerService.isItemActive()) {
      this.routerService.hideRouterOutlet();
    }
  }

  getTranslateX(index: number): string {
    const n = this.navItems.length;
    const center = Math.floor(n / 2);

    const distanceFromCenter = Math.abs(index - center);

    let x = 0;
    if (distanceFromCenter === 0) x = 0;
    else if (distanceFromCenter === 1) x = -15;
    else if (distanceFromCenter === 2) x = -80;

    return `translateX(${x}px)`;
  }
}
