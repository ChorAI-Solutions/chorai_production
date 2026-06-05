import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-legalprivacy',
  imports: [TranslatePipe],
  templateUrl: './legalprivacy.html',
  styleUrl: './legalprivacy.scss',
})
export class Legalprivacy implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  goHome() {
    this.router.navigate(['']);
  }
}
