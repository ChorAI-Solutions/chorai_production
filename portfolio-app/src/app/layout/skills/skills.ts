import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  scroll = inject(ScrollService);
  skills = [
    {src: '/assets/icons/angular.svg', alt: 'Angular'},
    {src: '/assets/icons/typescript.svg', alt: 'TypeScript'},
    {src: '/assets/icons/Javascript.svg', alt: 'JavaScript'},
    {src: '/assets/icons/HTML.svg', alt: 'HTML'},
    {src: '/assets/icons/CSS.svg', alt: 'CSS'},
    {src: '/assets/icons/Api.svg', alt: 'Rest API'},
    {src: '/assets/icons/Supabase.svg', alt: 'Supabase'},
    {src: '/assets/icons/git.svg', alt: 'Git'},
    {src: '/assets/icons/materialdesign.svg', alt: 'Material Design'},
    {src: '/assets/icons/SQL.svg', alt: 'SQL'},
    {src: '/assets/icons/Linux.svg', alt: 'Linux'},
    {src: '/assets/icons/PostgreSQL.svg', alt: 'PostgreSQL'},
    {src: '/assets/icons/Docker.svg', alt: 'Docker'},
    {src: '/assets/icons/n8n.png', alt: 'N8N'},
    {src: '/assets/icons/msazure.png', alt: 'MS Azure'},
    {src: '/assets/icons/msfoundery.png', alt: 'MS Foundery'},
    {src: '/assets/icons/Cloud.svg', alt: 'Cloud'},
  ]
}
