import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about-me',
  imports: [TranslatePipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  scroll = inject(ScrollService);
}
