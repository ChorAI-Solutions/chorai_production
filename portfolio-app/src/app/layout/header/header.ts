import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MobileMenuService } from '../../services/mobile-menu.service';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private mobileMenu = inject(MobileMenuService);
  lang = inject(LanguageService);
  scroll = inject(ScrollService);

  isMobileMenuOpen = this.mobileMenu.isOpen;

  closeMobileMenu() {
    this.mobileMenu.close();
  }

  navigateTo(sectionId: string) {
    this.mobileMenu.close();
    setTimeout(() => this.scroll.scrollTo(sectionId), 50);
  }

  scrollToWhyMe() {
    this.scroll.scrollTo('whyme');
  }
}
