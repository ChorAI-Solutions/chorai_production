import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MobileMenuService {
  readonly isOpen = signal(false);

  toggle() {
    this.isOpen.update(state => !state);
  }

  close() {
    this.isOpen.set(false);
  }
}
