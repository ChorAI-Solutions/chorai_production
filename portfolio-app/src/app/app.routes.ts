import { Routes } from '@angular/router';
import { Imprint } from './pages/imprint/imprint';
import { Legalprivacy } from './pages/legalprivacy/legalprivacy';

export const routes: Routes = [
  { path: 'imprint', component: Imprint },
  { path: 'privacy', component: Legalprivacy }
];
