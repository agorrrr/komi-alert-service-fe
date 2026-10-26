import { Injectable } from '@angular/core';
import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  metadata;
  userInfo;
  userRole;
  moduleList;
  isIFrame;
  hitApiFailed :number =0;
  limitParamsScheme;
  constructor(
    readonly alertModalService: AlertModalService,
    readonly router: Router,
    readonly translate: TranslateService
  ) {}

  isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  isCompanyUser(data: any): boolean {
    try {
      if (data.level_user == 2) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  }

  isAllOU(data: any): boolean {
    try {
      if (data?.merapi_company.oucode == 'ALL') {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  }
  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  setMetdata(data: any) {
    if (this.isJsonString(JSON.stringify(data))) {
      if (data.metadata) {
        if (!this.isObjectEmpty(data.metadata)) {
          let metadata = JSON.parse(data?.metadata);
          this.userInfo = data;
          this.metadata =
            metadata.merapi_company != undefined
              ? metadata?.merapi_company
              : metadata;
          this.metadata.isCompanyUser = this.isCompanyUser(data);
          this.metadata.isAllOU = this.isAllOU(metadata);
        }
      }
    }
  }

  setModulesList(data: any) {
    let moduleMenus = data?.moduleMenus;
    this.moduleList = Array.isArray(moduleMenus) ? moduleMenus : moduleMenus.metamodule ?? moduleMenus;
  }

  getModuleList() {
    return this.moduleList;
  }

  setgroupRole(data: any) {
    let userRole_ = data?.id_roles_group;
    this.userInfo = data;
    this.userRole = userRole_;
  }

  setIsIFrame(data: any) {
    this.isIFrame = data;
  }
  getIsIFrame() {
    return this.isIFrame;
  }
  getHitApiFailed() {
    return this.hitApiFailed;
  }

  setHitApiFailed(data: any) {
    this.hitApiFailed = data;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getUserRole() {
    return this.userRole;
  }

  getMetadata() {
    return this.metadata;
  }

  getVar(namaVariable:string) {
    return this[namaVariable];
  }
  setVar(namaVariable:string,value:any) {
    this[namaVariable] = value;
  }
  

  findMenuByName = (name: any) => {
    for (const module of this.moduleList) {
      if (module.menus && module.menus.length > 0) {
        for (const menu of module.menus) {
          if (menu.name_menu.toLowerCase() === name.toLowerCase()) {
            return menu.use_approval != '0';
          }
        }
      }
    }

    return false;
  };

  findMenuByUrl = (url: any) => {
    for (const module of this.moduleList) {
      if (module.menus && module.menus.length > 0) {
        for (const menu of module.menus) {
          if (menu.link_menu.toLowerCase() === url.toLowerCase()) {
            return menu.use_approval != '0';
          }
        }
      }
    }
    return false;
  };

  DEFAULT_ACL = {
    create: 1,
    read: 1,
    view: 1,
    update: 1,
    delete: 1,
    approve: 0,
    generate: 0,
    download: 0,
  };

  findMenuByUrlAcl(url: any) {
    const handleUnauthorized = () => {
      
      this.alertModalService.showAlert(
        this.translate.instant('Not Authorized!')
      );
      this.router.navigate(['/home']);
    };

    for (const module of this.moduleList) {
      if (!module.menus?.length) continue;

      const matchingMenu = module.menus.find(
        (menu) => menu.link_menu.toLowerCase() === url.toLowerCase()
      );

      if (!matchingMenu) continue;

      if (!matchingMenu.acl_menus) return this.DEFAULT_ACL;

      if (matchingMenu.acl_menus.read !== '1') {
        handleUnauthorized();
      }

      return matchingMenu.acl_menus;
    }

    return this.DEFAULT_ACL;
  }

   checkMenuByUrlAcl (url: any) {
    for (const module of this.moduleList) {
        if (!module.menus?.length) continue;

        const matchingMenu = module.menus.find(menu => 
            menu.link_menu.toLowerCase() === url.toLowerCase()
        );

        if (!matchingMenu) continue;

        return matchingMenu.acl_menus || this.DEFAULT_ACL;
    }
    
    return this.DEFAULT_ACL;
};
}
