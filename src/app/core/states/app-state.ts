import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, shareReplay} from "rxjs";
import {Router} from "@angular/router";
import {IModule, UserInfo} from "../models/Userinfo";

export interface MenuACL {
  read: string;
  view: string;
  create: string;
  update: string;
  delete: string;
  approval: string;
}

export interface Menu {
  id_menu: string;
  name_menu: string;
  link_menu: string;
  acl_menus: MenuACL;
  use_approval: string;
  c_create: number;
  c_read: number;
  c_update: number;
  c_delete: number;
  c_view: number;
  c_approve: number;
}

export interface ModuleACL {
  read: boolean;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  approval: boolean;
}

export interface pagePermissions {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canView: boolean;
  canApprove: boolean;
  useApproval: boolean;
}

export interface NavigationItem {
  type: 'module' | 'menu';
  id: string;
  name: string;
  link: string;
  permissions: pagePermissions;
  parentModuleId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppState {
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRouteSubject.next(this.router.url);
    });
  }

  private modulesSubject = new BehaviorSubject<IModule[]>([]);
  private userInfoSubject = new BehaviorSubject<UserInfo>(null);
  private currentRouteSubject = new BehaviorSubject<string>('');

  modules$ = this.modulesSubject.asObservable().pipe(shareReplay(1));

  // Enhanced current permissions that handles both modules and menus
  currentPagePermissions$ = combineLatest([
    this.modules$,
    this.currentRouteSubject
  ]).pipe(
    map(([modules, currentRoute]) => {
      return this.extractCurrentPagePermissions(modules as IModule[], currentRoute as string);
    }),
    shareReplay(1)
  );

  init(userinfo: UserInfo) {
    this.userInfoSubject.next(userinfo);
    this.loadModules(userinfo.moduleMenus);
  }

  loadModules(modules: IModule[]) {
    this.modulesSubject.next(modules);
  }

  isChecker() {
    // return true;
    return this.userInfoSubject.value.name_role === 'Approver'
  }

  // Enhanced getCurrentACL that handles both modules and menus
  get getCurrentACL(): pagePermissions | null {
    const modules = this.modulesSubject.value;
    const currentRoute = this.router.url;
    return this.extractCurrentPagePermissions(modules, currentRoute);
  }

  // Main method that handles both standalone modules and menus
  private extractCurrentPagePermissions(modules: IModule[], route: string): pagePermissions | null {
    for (const module of modules) {
      // First, check if it's a standalone module (has link_module and no children_menu)
      if (module.link_module &&
        module.link_module !== '-' &&
        route.includes(module.link_module)) {

        return this.extractModulePermissions(module);
      }

      // Then check menus within modules
      if (module.menus && module.menus.length > 0) {
        const menu = module.menus.find(m => route.includes(m.link_menu));
        if (menu) {
          return this.extractMenuPermissions(menu);
        }
      }
    }
    return null;
  }

  // Extract permissions from standalone modules
  private extractModulePermissions(module: IModule): pagePermissions {
    if (!module.acl_modules) {
      return this.getDefaultPermissions();
    }

    let moduleACL: ModuleACL;
    try {
      moduleACL = typeof module.acl_modules === 'string'
        ? JSON.parse(module.acl_modules)
        : module.acl_modules;
    } catch (error) {
      console.warn('Failed to parse module ACL:', error);
      return this.getDefaultPermissions();
    }

    return {
      canCreate: moduleACL.create === true,
      canRead: moduleACL.read === true,
      canUpdate: moduleACL.update === true,
      canDelete: moduleACL.delete === true,
      canView: moduleACL.view === true,
      canApprove: moduleACL.approval === true,
      useApproval: moduleACL.approval === true // Use approval flag from module ACL
    };
  }

  // Extract permissions from menus (existing logic)
  private extractMenuPermissions(menu: Menu): pagePermissions {
    if (!menu.acl_menus) {
      return this.getDefaultPermissions();
    }

    return {
      canCreate: menu.acl_menus?.create === '1' && menu.c_create === 1,
      canRead: menu.acl_menus?.read === '1' && menu.c_read === 1,
      canUpdate: menu.acl_menus?.update === '1' && menu.c_update === 1,
      canDelete: menu.acl_menus?.delete === '1' && menu.c_delete === 1,
      canView: menu.acl_menus?.view === '1' && menu.c_view === 1,
      canApprove: menu.acl_menus?.approval === '1' && menu.c_approve === 1,
      useApproval: menu.use_approval === '1'
    };
  }

  // Provide default permissions when none found
  private getDefaultPermissions(): pagePermissions {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
      canView: false,
      canApprove: false,
      useApproval: false
    };
  }
}
