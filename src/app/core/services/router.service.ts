import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public isItemActive = signal<boolean>(false);

  public showRouterOutlet(): void {
    this.isItemActive.set(true);
  }

  public hideRouterOutlet(): void {
    this.isItemActive.set(false);
  }
}
