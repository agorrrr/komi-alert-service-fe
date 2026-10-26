import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
  standalone: false,
})
export class ViewDataComponent {
  @Input() data: any[];
  @Input() widthLabel: any;
  @Input() widthValue: any;

  itemsPerColumn: any;
  isHavePermission: boolean = false;
  isHaveWhoWhen: boolean = false;
  permissions: any[];
  whoWhen: any[];

  whoWhenKeys: string[] = [
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
  ];
  whoWhenLabels: { [key: string]: string } = {
    created_at: 'Created At',
    updated_at: 'Updated At',
    created_by: 'Created By',
    updated_by: 'Updated By',
  };

  permissionKeys: string[] = [
    'c_create',
    'c_read',
    'c_update',
    'c_delete',
    'c_view',
    'c_approve',
  ];
  permissionLabels: { [key: string]: string } = {
    c_create: 'Create',
    c_read: 'Read',
    c_update: 'Update',
    c_delete: 'Delete',
    c_view: 'View',
    c_approve: 'Approve',
  };

  ngOnInit(): void {
    this.isHavePermission = this.data.some((item) => item.key == 'c_create');
    this.isHaveWhoWhen = this.data.some((item) => item.key == 'created_by');
    this.permissions = this.data.filter((item: any) =>
      this.permissionKeys.includes(item.key),
    );
    this.whoWhen = this.data
      .filter((item: any) => this.whoWhenKeys.includes(item.key))
      .sort((a, b) => a - b);
    this.data = this.data.filter(
      (item) =>
        !this.permissionKeys.includes(item.key) &&
        !this.whoWhenKeys.includes(item.key),
    );
  }

  // Fungsi untuk ambil icon berdasarkan nilai
  getPermissionIcon(key: string): string {
    const found = this.permissions.find((p) => p.key === key);
    return found?.value === 1 ? 'pi-check-circle' : 'pi-circle';
  }

  // Fungsi untuk ambil icon berdasarkan nilai
  getWhoWhenIcon(key: string): string {
    const found = this.whoWhen.find((p) => p.key === key);
    return found?.key === 'created_at' || found?.key === 'updated_at'
      ? 'pi-clock'
      : 'pi-user';
  }

  getIcon(key: string): string {
    const found = this.data.find((p) => p.key === key);
    if (found?.key.includes('id_') || found?.key.includes('_id')) {
      return 'pi-id-card';
    } else if (found?.key.includes('link') || found?.key.includes('uri')) {
      return 'pi-link';
    } else if (found?.key.includes('menu') || found?.key.includes('list')) {
      return 'pi-list';
    } else {
      return 'pi-database';
    }
  }
}
