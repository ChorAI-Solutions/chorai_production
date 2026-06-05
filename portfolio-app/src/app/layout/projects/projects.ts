import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface Project {
  technologies: { src: string; alt: string }[];
  liveLink: string;
  githubLink: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private translate = inject(TranslateService);
  activeIndex = 0;

  projects: Project[] = [
    {
      technologies: [
        { src: '/assets/icons/JavaScript.svg', alt: 'JavaScript' },
        { src: '/assets/icons/HTML.svg', alt: 'HTML' },
        { src: '/assets/icons/CSS.svg', alt: 'CSS' },
      ],
      liveLink: 'https://waldemarchorow.developerakademie.net/projekte/elpololoco/index.html',
      githubLink: 'https://github.com/WaldemarChorow/elpololoco.git',
      image: '/assets/images/projects/elpololoco.png',
    },
    {
      technologies: [
        { src: '/assets/icons/angular.svg', alt: 'Angular' },
        { src: '/assets/icons/TypeScript.svg', alt: 'TypeScript' },
        { src: '/assets/icons/HTML.svg', alt: 'HTML' },
      ],
      liveLink: '#',
      githubLink: '#',
      image: '/assets/images/projects/join.svg',
    },
    {
      technologies: [
        { src: '/assets/icons/JavaScript.svg', alt: 'JavaScript' },
        { src: '/assets/icons/HTML.svg', alt: 'HTML' },
        { src: '/assets/icons/CSS.svg', alt: 'CSS' },
        { src: '/assets/icons/Api.svg', alt: 'Rest API' },
      ],
      liveLink: 'https://waldemarchorow.developerakademie.net/projekte/pokedex/index.html',
      githubLink: 'https://github.com/WaldemarChorow/pokedex.git',
      image: '/assets/images/projects/pokedex.png',
    },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }

  getTechNames(techs: { src: string; alt: string }[]): string {
    return techs.map(t => t.alt).join(', ');
  }

  getProjectKey(index: number, field: string): string {
    return `projects.items.${index}.${field}`;
  }
}
