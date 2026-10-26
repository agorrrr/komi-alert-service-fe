import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  MessageService,
} from 'primeng/api';

import { EnvService } from 'src/app/services/env/env.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { filter } from 'rxjs';
import { AppState } from '../../core/states/app-state';

@Component({
  selector: 'app-sidebarlayoutrefactor',
  templateUrl: './sidebarlayoutrefactor.component.html',
  styleUrls: ['./sidebarlayoutrefactor.component.scss'],
  standalone: false,
})
export class SidebarlayoutrefactorComponent implements OnInit {
  isSideCollapse: boolean = false;
  position: string = 'top-right';

  tokenCookie: string = '';

  _userInfo: any = {};
  isFetchMenu: boolean = false;
  sideMenus: MenuItem[] = [];
  sideModuleOnly: SideMenuModel[] = [];
  home: MenuItem | undefined;
  navigations: MenuItem[] = [];
  items: MenuItem[] | undefined;
  avatarUserIcon: any = '';

  user: any = '';
  showNotif: boolean = false;
  showTask: boolean = false;

  notifList: any[] = [];
  taskList: any[] = [];

  lang: string = localStorage.getItem('lang') || 'id';
  countNotif: number = 0;
  countTask: number = 0;
  isAdmin: boolean = false;

  isLogged: boolean = false;
  isCollapsed = false;
  isMobileSidebarOpen = false;

  langList = [
    {
      name: 'Indonesia',
      label:
        '  <div class="flex item-center"><img width="25px" src="assets/images/apps/004-indonesia.png" shape="square"><span class="mt-1 ml-2"><b>Indonesia</b></span></div>',
      code: 'id',
      path: 'assets/images/apps/004-indonesia.png',
      escape: false,
      command: (event) => {
        this.ChangeLang('id');
      },
    },
    {
      name: 'English',
      label:
        '  <div class="flex item-center"><img width="25px" src="assets/images/apps/260-united-kingdom.png" shape="square"><span class="mt-1 ml-2"><b>English</b></span></div>',
      code: 'en',
      path: 'assets/images/apps/260-united-kingdom.png',
      escape: false,
      command: (event) => {
        this.ChangeLang('en');
      },
    },
  ];
  selectedLanguage = this.lang == 'id' ? this.langList[0] : this.langList[1];

  constructor(
    readonly _authService: AuthService,
    readonly _env: EnvService,
    readonly confirmationService: ConfirmationService,
    readonly messageService: MessageService,
    readonly _activeroute: ActivatedRoute,
    readonly translateService: TranslateService,
    readonly enviroment: EnvService,
    readonly metadataService: MetadataService,
    readonly translate: TranslateService,
    readonly appState: AppState,
    readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.home = { icon: 'pi pi-smarthomebreadcrumb', routerLink: '/' };

    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-refresh',
        command: () => {},
      },
      {
        label: 'Help',
        icon: 'pi pi-times',
        command: () => {},
      },
    ];
    if (this.router.url == '/') {
      this.navigations.push({
        label: 'Dashboard',
      });
    } else {
      const removeQueryParams = this.router.url.split('?')[0];
      let paths: string[] = [];
      if (this.router.url.includes('/detail/')) {
        paths = removeQueryParams.slice(1).replace('detail', 'edit').split('/');
      } else if (
        removeQueryParams.includes('/menu-mapper/') ||
        removeQueryParams.includes('/user-mapper/')
      ) {
        paths = removeQueryParams.slice(1).split('/');
      } else if (removeQueryParams.includes('/detail')) {
        paths = removeQueryParams
          .slice(1)
          .replace('detail', 'create')
          .split('/');
      } else {
        paths = removeQueryParams.slice(1).split('/');
      }

      // Remove the last path if it looks like an ID (uuid, number, something long)
      if (paths.length > 0) {
        const lastPath = paths[paths.length - 1];
        // if path contains '=' (query style), remove it
        if (/=/.test(lastPath)) {
          paths.pop();
        } else if (
          // catch anything that is a hex string of length > 12 (likely id)
          /^[a-zA-Z0-9\-]{12,}$/.test(lastPath) ||
          // or just a number
          /^\d+$/.test(lastPath)
        ) {
          paths.pop();
        }
      }
      this.refreshBreadcumb(paths);
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let removeQueryParams = event.urlAfterRedirects.split('?')[0];
        let paths: string[] = [];
        if (this.router.url.includes('/detail/')) {
          paths = removeQueryParams
            .slice(1)
            .replace('detail', 'edit')
            .split('/');
        } else if (
          this.router.url.includes('/menu-mapper/') ||
          this.router.url.includes('/user-mapper/')
        ) {
          paths = this.router.url.slice(1).split('/');
        } else if (this.router.url.includes('/detail')) {
          paths = removeQueryParams
            .slice(1)
            .replace('detail', 'create')
            .split('/');
        } else {
          paths = removeQueryParams.slice(1).split('/');
        }

        // Remove the last path if it looks like an ID (uuid, number, something long)
        if (paths.length > 0) {
          const lastPath = paths[paths.length - 1];
          // if path contains '=' (query style), remove it
          if (/=/.test(lastPath)) {
            paths.pop();
          } else if (
            /^[a-zA-Z0-9\-]{12,}$/.test(lastPath) ||
            /^\d+$/.test(lastPath)
          ) {
            paths.pop();
          }
        }
        this.refreshBreadcumb(paths);
      });
    this._refreshAttribute();
  }

  refreshBreadcumb(urlPath: string[]) {
    this.navigations = [];
    urlPath.forEach((path: any) =>
      this.navigations.push({
        label: this.capitalize(path.replaceAll('-', ' ')),
      }),
    );
  }

  _refreshAttribute() {
    this.isFetchMenu = true;

    // Load user from localStorage (works for both local and production with JWT auth)
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      this.isLogged = true;
      this._userInfo = JSON.parse(storedUser);
      this._authService.emitLayout(this._userInfo);
      this.appState.init(this._userInfo);

      // Alert Engine menu structure
      this.sideMenus = [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          url: '/',
          routerLink: '/',
          queryParams: undefined,
          items: null!,
        },
        {
          label: 'Alert Management',
          icon: 'pi pi-bell',
          url: null!,
          routerLink: null!,
          queryParams: undefined,
          items: [
            {
              label: 'Sources',
              icon: 'pi pi-database',
              url: '/alert-management/sources',
              routerLink: '/alert-management/sources',
              queryParams: undefined,
              items: null!,
            },
            {
              label: 'Rules',
              icon: 'pi pi-list',
              url: '/alert-management/rules',
              routerLink: '/alert-management/rules',
              queryParams: undefined,
              items: null!,
            },
            {
              label: 'Destinations',
              icon: 'pi pi-send',
              url: '/alert-management/destinations',
              routerLink: '/alert-management/destinations',
              queryParams: undefined,
              items: null!,
            },
            {
              label: 'Alert Logs',
              icon: 'pi pi-history',
              url: '/alert-logs',
              routerLink: '/alert-logs',
              queryParams: undefined,
              items: null!,
            },
          ],
        },
        {
          label: 'User Management',
          icon: 'pi pi-users',
          url: null!,
          routerLink: null!,
          queryParams: undefined,
          items: [
            {
              label: 'Users',
              icon: 'pi pi-user',
              url: '/user-management/users',
              routerLink: '/user-management/users',
              queryParams: undefined,
              items: null!,
            },
          ],
        },
      ];

      this.items = [
        {
          label: this.translate.instant('User Profile'),
          icon: 'pi pi-user',
          routerLink: [`/profile/my-profile`],
        },
        { separator: true },
        {
          label: this.translate.instant('Log Out'),
          icon: 'pi pi-power-off',
          command: () => this._confirmLogout(),
        },
      ];

      const name = this._userInfo.username?.substring(0, 1) || 'U';
      this.avatarUserIcon = name.toUpperCase();
      this.isFetchMenu = false;
    } else {
      this.isLogged = false;
      this.isFetchMenu = false;
      this.router.navigate(['/auth/login']);
    }
  }

  processChildMenus = (menus: any[]): SideMenuModel[] => {
    const itemMenuChild: SideMenuModel[] = [];
    menus.forEach((menuChild) => {
      itemMenuChild.push(this.createChildMenu(menuChild));
    });
    return itemMenuChild;
  };

  createChildMenu = (menuChild: any): SideMenuModel => {
    return {
      label: menuChild.name_menu,
      icon: menuChild.icon_menu || '',
      url: menuChild.url ?? null,
      routerLink: menuChild.link_menu ?? null,
      queryParams: undefined,
      items: null,
    };
  };

  _confirmLogout() {
    this.confirmationService.confirm({
      message: this.translate.instant(
        'Do you want to logout this Applications?',
      ),
      header: this.translate.instant('Logout Confirmation'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'warn',
          summary: this.translate.instant('logging off'),
          detail: this.translate.instant('Wait while logging Out..!'),
          closable: false,
          life: 1000,
        });
        setTimeout(() => {
          this._authService.logout();
          this.isLogged = false;
          this.router.navigate(['/auth/login']);
        }, 500);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: this.translate.instant('Cancelled'),
              detail: this.translate.instant('reject'),
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: this.translate.instant('Cancelled'),
              detail: this.translate.instant('cancel'),
            });
            break;
        }
      },
    });
  }

  _changeMenu() {
    this._authService._loggedInfo$.subscribe((data) => {
      if (data.status == 200) {
        let name = data['data'].username?.substring(0, 1) || 'U';
        this.avatarUserIcon = name.toUpperCase();
        this.isLogged = true;
      }
      if (!this.isLogged) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  toggleSidebar() {
    this.collapseAllMenus();
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSidebarResponsive() {
    if (window.innerWidth <= 960) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    } else {
      this.toggleSidebar();
    }
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  expandFileMenu(labelof: any) {
    const fileMenuItem = this.sideMenus.find((item) => item.label === labelof);
    if (fileMenuItem) {
      fileMenuItem.expanded = true;
      this.isCollapsed = !this.isCollapsed;
    }
  }

  collapseAllMenus() {
    this.sideMenus.forEach((item) => {
      item.expanded = false;
      if (item.items) {
        item.items.forEach((subItem) => {
          subItem.expanded = false;
        });
      }
    });
  }

  navigateMyTask() {
    this.router.navigateByUrl('/my-task');
  }
  navigateNotification() {
    this.router.navigateByUrl('/notification-management');
  }

  ChangeLang(lang: any) {
    const selectedLanguage = lang;

    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
    location.reload();
  }

  capitalize(str: string) {
    var splittedEnter = str.split(' ');
    var capitalized;
    var capitalizedResult;
    for (var i = 0; i < splittedEnter.length; i++) {
      capitalized = splittedEnter[i].charAt(0).toUpperCase();
      splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
    }
    return splittedEnter.join(' ');
  }
}

interface SideMenuModel {
  label: string;
  icon: string;
  url: string;
  routerLink: string;
  queryParams: any;
  items: SideMenuModel[];
}
