import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authCanActivate, authCanMatch } from './auth/guards/auth.guard';
import { publicCanActivate, publicCanMatch } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [publicCanActivate],
    canMatch: [ publicCanMatch ]
  },
  {
    path: 'sport',
    loadChildren: () => import('./sport/sport.module').then((m) => m.SportModule),
    canActivate: [authCanActivate],
    canMatch: [authCanMatch],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'sport',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
