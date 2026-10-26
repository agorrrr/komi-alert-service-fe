export interface UserInfo {
  id_user: string
  id_tenant_user: string
  id_ext_tenant_user: any
  keyid_user: string
  name_user: string
  name_role: string
  login_type_user: number
  level_user: number
  status_user: number
  email_user: string
  mobile: string
  keyactivated: any
  metadata: any
  trusted_key: any
  islogin: number
  attemptlog: number
  name_tenant: string
  desc_tenant: string
  address_tenant: string
  phone_tenant: string
  email_tenant: any
  statustenant: number
  groupId: string
  id_app: string
  name_app: string
  desc_app: string
  id_tenant_app: string
  status: number
  liscense_app: any
  expired_app: string
  use_approve_app: number
  link_app: string
  login_type: number
  key_app: string
  path_icon: string
  api_sec: any
  api_mapping: any
  api_security: number
  id_group_set_group: string
  id_app_group: string
  key: string
  expireToken: string
  attributeconfig: Attributeconfig
  moduleMenus: IModule[]
}

export interface Attributeconfig {
  USERNAMERULE: string
  HOST: string
  SERVICE: string
  PORT: string
  USER: string
  PASSWORD: string
  URI: string
  USERSEARCHBASE: string
  USERNAMEATTRIBUTE: string
  ACCOUNTATTRIBUTE: string
  OUATTRIBUTE: string
  TOKEN_EXPIRED: string
  ATTEMPT: string
  IS_SINGLE_SESSION: string
  COMPLEX: string
}

export interface IModule {
  id_seq_gd: string
  id_header_gd: string
  id_module_gd: string
  id_menus_gd?: string
  created_by: string
  created_at: string
  updated_at?: string
  acl_menus?: string
  acl_modules?: string
  name_module: string
  desc_module: string
  children_menu: string
  children_module: string
  link_module: string
  icon_module: string
  seq: number
  menus: IMenu[]
}

export interface IMenu {
  id_menu: string
  name_menu: string
  desc_menu: string
  icon_menu: string
  link_menu: string
  created_by: string
  created_at: string
  updated_at?: string
  id_module_menu: string
  seq_menu: number
  id_app_menu: string
  use_approval: string
  c_create: number
  c_read: number
  c_update: number
  c_delete: number
  c_view: number
  c_approve: number
  acl_menus: AclMenus
}

export interface AclMenus {
  read: string
  view: string
  create: string
  update: string
  delete: string
  approval: string
}

export type MenuResult = {
  id_menu: string;
  use_approval: boolean; // Boolean value for use approval
};
