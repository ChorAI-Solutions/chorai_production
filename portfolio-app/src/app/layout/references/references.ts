import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Reference } from './reference.interface';

@Component({
  selector: 'app-references',
  imports: [TranslatePipe],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References {
  references: Reference[] = [
    { id: 1, name: 'Björn', project: 'Bestell App', text: 'dfsdfsdfsdfsdf', linkedInLink: '' },
    { id: 2, name: 'Björn', project: 'Bestell App', text: 'dfsdfsdfsdfsdf', linkedInLink: '' },
    { id: 3, name: 'Björn', project: 'Bestell App', text: 'dfsdfsdfsdfsdf', linkedInLink: '' },
    { id: 4, name: 'Björn', project: 'Bestell App', text: 'dfsdfsdfsdfsdf', linkedInLink: '' },
  ];
}
