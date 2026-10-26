import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  MessageService,
} from 'primeng/api';

import { UserinfoService } from 'src/app/services/dummy/userinfo.service';

import { EnvService } from 'src/app/services/env/env.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';

@Component({
  selector: 'app-sidebarlayout',
  templateUrl: './sidebarlayout.component.html',
  styleUrls: ['./sidebarlayout.component.scss'],
  standalone: false,
})
export class SidebarlayoutComponent implements OnInit {
  isSideCollapse: boolean = false;
  position: string = 'top-right';
  readonly sub: any;
  tokenCookie: string = '';

  _userInfo: any = {};
  isFetchMenu: boolean = false;
  sideMenus: MenuItem[] = [];
  items: MenuItem[] | undefined;
  avatarUserIcon: any = '';

  user: any = '';
  showNotif: boolean = false;
  showTask: boolean = false;

  notifList: any[] = [];
  taskList: any[] = [];

  langList: any[] = [];
  lang: string = localStorage.getItem('lang') || 'id';
  countNotif: number = 0;
  countTask: number = 0;

  isLogged: boolean = false;

  constructor(
    readonly _userInfoService: UserinfoService,
    readonly _authService: AuthService,
    readonly _env: EnvService,
    readonly confirmationService: ConfirmationService,
    readonly messageService: MessageService,
    readonly _activeroute: ActivatedRoute,
    readonly translateService: TranslateService,
    readonly enviroment: EnvService,
    readonly metadataService: MetadataService,
    readonly alertModalService: AlertModalService,
    readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.langList = [
      { name: 'Indonesia', code: 'id' },
      { name: 'English', code: 'en' },
    ];

    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-refresh',
        command: () => { },
      },
      {
        label: 'Help',
        icon: 'pi pi-times',
        command: () => { },
      },
    ];
    this._refreshAttribute();
  }

  _refreshAttribute() {
    this.isFetchMenu = true;

    // Load user from localStorage (local mode)
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      this.isLogged = true;
      this._userInfo = JSON.parse(storedUser);
      this._authService.emitLayout(this._userInfo);

      // User menu items
      this.items = [
        // {
        //   label: 'User Profile',
        //   icon: 'pi pi-user',
        //   routerLink: ['/profile/my-profile'],
        // },
        // { separator: true },

        {
          label: 'Log Out',
          icon: 'pi pi-power-off',
          command: () => this._confirmLogout(),
        },
      ];

      // Hardcoded Alert Engine menus
      this.sideMenus = [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/',
        },
        {
          label: 'Alert Logs',
          icon: 'pi pi-history',
          routerLink: '/alert-logs',
        },
        {
          label: 'Alert Management',
          icon: 'pi pi-bell',
          items: [
            {
              label: 'Alert Logs',
              icon: 'pi pi-history',
              routerLink: '/alert-management/alert-logs',
            },
            {
              label: 'Rules',
              icon: 'pi pi-list',
              routerLink: '/alert-management/rules',
            },
            {
              label: 'Sources',
              icon: 'pi pi-database',
              routerLink: '/alert-management/sources',
            },
            {
              label: 'Destinations',
              icon: 'pi pi-send',
              routerLink: '/alert-management/destinations',
            },
          ],
        },
        {
          label: 'User Management',
          icon: 'pi pi-users',
          items: [
            {
              label: 'Users',
              icon: 'pi pi-user',
              routerLink: '/user-management/users',
            },
          ],
        },
      ];

      const name = this._userInfo.username?.substring(0, 1) || 'U';
      this.avatarUserIcon = name.toUpperCase();
      this.isFetchMenu = false;
    } else {
      this.isLogged = false;
      this.router.navigate(['/auth/login']);
    }
  }

  _menutoggle() {
    this.isSideCollapse = !this.isSideCollapse;
  }

  _confirmLogout() {
    this.confirmationService.confirm({
      message: 'Do you want to logout this application?',
      header: 'Logout Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Logging off',
          detail: 'Wait while logging out...',
          closable: false,
          life: 1000,
        });
        setTimeout(() => {
          this._authService.logout();
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Successfully logged off!',
            closable: false,
            life: 3000,
          });
          this.isLogged = false;
          this.router.navigate(['/auth/login']);
        }, 500);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  _changeMenu() {
    this._authService._loggedInfo$.subscribe((data) => {
      if (data.status == 200) {
        const name = data['data'].username?.substring(0, 1) || 'U';
        this.avatarUserIcon = name.toUpperCase();
        this.isLogged = true;
      }
      if (!this.isLogged) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  ChangeLang(lang: any) {
    const selectedLanguage = lang;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
    location.reload();
  }

  onTaskButtonClick() {
    this.showTask = true;
  }

  onNotifButtonClick() {
    this.showNotif = true;
  }

  onProfileButtonClick() { }
}

interface SideMenuModel {
  label: string;
  icon: string;
  url: string;
  routerLink: string;
  queryParams: any;
  items: SideMenuModel[];
}
