import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const NAVBAR_HEIGHT_DESKTOP = 104;
const NAVBAR_HEIGHT_MOBILE = 0;

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private router = inject(Router);

  scrollTo(sectionId: string): void {
    const isHome = this.router.url === '/' || this.router.url === '';

    if (isHome) {
      this.doScroll(sectionId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.doScroll(sectionId), 100);
      });
    }
  }

  private doScroll(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const isMobile = window.innerWidth <= 1023;
    const offset = isMobile ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT_DESKTOP;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
