import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

import { UnauthorizePageComponent } from './layout/unauthorize-page/unauthorize-page.component';

import { mainGuardGuard } from './core/guards/main-guard.guard';

import { SidebarlayoutrefactorComponent } from './layout/sidebarlayoutrefactor/sidebarlayoutrefactor.component';
import { SigninPageComponent } from './layout/signin-page/signin-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { loginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'auth/login',
    component: SigninPageComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    canActivate: [mainGuardGuard],
    component: SidebarlayoutrefactorComponent,
    children: [
      { path: '', component: HomeComponent },

      {
        path: 'user-management',
        loadChildren: () =>
          import('./features/user-management/user-management.module').then(
            (m) => m.UserManagementModule,
          ),
      },
      // Alert Management (Rules, Sources, Destinations)
      {
        path: 'alert-management',
        children: [
          {
            path: 'destinations',
            loadChildren: () =>
              import('./features/destination-management/destination-management.module').then(
                (m) => m.DestinationManagementModule,
              ),
          },
          // Future: Rules and Sources will go here
          {
            path: 'sources',
            loadChildren: () =>
              import('./features/source-management/source-management.module').then(
                (m) => m.SourceManagementModule,
              ),
          },
          {
            path: 'rules',
            loadChildren: () =>
              import('./features/rule-management/rule-management.module').then(
                (m) => m.RuleManagementModule,
              ),
          },
        ],
      },
      // Alert Logs - Dedicated page
      {
        path: 'alert-logs',
        loadChildren: () =>
          import('./features/alert-logs/alert-logs.module').then(
            (m) => m.AlertLogsModule,
          ),
      },

      { path: 'unauthorized', component: UnauthorizePageComponent },
      { path: 'unauthorized/:param', component: UnauthorizePageComponent },
      { path: 'home', component: DashboardComponent },
      { path: ':id', component: DashboardComponent }, // Catch-all, must be last!
    ],
  },
];

/**
 * canceledNavigationResolution = cara Angular resolve navigasi batal.
 * paramsInheritanceStrategy = bagaimana child routes mewarisi param.
 * urlUpdateStrategy = kapan URL di-update (eager = cepat, deferred = setelah resolve).
 * urlHandlingStrategy = kalau mau custom logic URL parsing.
 * malformedUriErrorHandler = kalau URL rusak, mau diapain?
 * titleStrategy = strategi custom buat halaman <title>.
 */

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
