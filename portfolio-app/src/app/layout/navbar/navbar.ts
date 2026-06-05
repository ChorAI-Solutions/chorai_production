import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MobileMenuService } from '../../services/mobile-menu.service';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private mobileMenu = inject(MobileMenuService);
  private router = inject(Router);
  lang = inject(LanguageService);
  scroll = inject(ScrollService);

  isMobileMenuOpen = this.mobileMenu.isOpen;

  get isHome(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  toggleMobileMenu() {
    this.mobileMenu.toggle();
  }

  closeMobileMenu() {
    this.mobileMenu.close();
  }
}
