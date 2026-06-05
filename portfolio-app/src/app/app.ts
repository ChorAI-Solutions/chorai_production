import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './layout/header/header';
import { Navbar } from './layout/navbar/navbar';
import { AboutMe } from './layout/about-me/about-me';
import { Skills } from './layout/skills/skills';
import { Projects } from './layout/projects/projects';
import { Contact } from './layout/contact/contact';
import { References } from './layout/references/references';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, AboutMe, Skills, Projects, Contact, References, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
  isHome = signal(true);

  constructor(private router: Router) {
    this.isHome.set(this.router.url === '' || this.router.url === '/');
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.isHome.set(url === '' || url === '/');
      });
  }
}
