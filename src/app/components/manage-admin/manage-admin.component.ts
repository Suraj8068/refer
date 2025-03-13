  import { Component, OnInit } from '@angular/core';
  import { AdminService } from '../../services/admin.service';
  import { OrganizationService } from 'src/app/services/organization.service';
  import Swal from 'sweetalert2';

  interface Permission {
    permissionId: number;
    permissionName: string;
    canAccess: boolean;
  }

  interface Admin {
    userId: number;
    name: string;
    orgId: number;
    roleId: number;
    permissions: Permission[];
  }

  @Component({
    selector: 'app-manage-admin',
    templateUrl: './manage-admin.component.html',
    styleUrls: ['./manage-admin.component.css']
  })
  export class ManageAdminComponent implements OnInit {
    admins: Admin[] = [];
    updatedPermissions: { userId: number; orgId: number; permissionId: number; canAccess: boolean }[] = [];
    organizations: any[] = [];

    constructor(private adminService: AdminService, private orgService: OrganizationService) {}

    ngOnInit(): void {
      this.getAdminList();
      this.loadOrganizations();
    }

    getAdminList() {
      this.adminService.getAdminList().subscribe(
        (data: any) => {
          this.admins = data;
        },
        (error: any) => {
          console.error('Error fetching admins:', error);
        }
      );
    }
    
    loadOrganizations() {
      this.orgService.getOrganizations().subscribe((data: any[]) => {  
        this.organizations = data;
      });
    }

    getOrganizationName(orgId: number): string {
      if (!this.organizations || this.organizations.length === 0) {
        return 'Loading...';
      }
      const org = this.organizations.find(o => o.orgId == orgId);  
      return org ? org.name : 'Unknown';
    }

    getRoleName(roleId: number | undefined): string {
      if (!roleId) return 'Unknown';
      switch (roleId) {
        case 1: return 'Super Admin';
        case 2: return 'Admin';
        case 3: return 'Normal User';
        default: return 'Unknown';
      }
    }
    togglePermission(admin: Admin, permission: Permission, event: any) {
      const newState = event.target.checked;
      //permission.canAccess = newState; 
    
      const existingIndex = this.updatedPermissions.findIndex(
        (p) => p.userId === admin.userId && p.orgId === admin.orgId && p.permissionId === permission.permissionId
      );
    
      if (existingIndex !== -1) {
        this.updatedPermissions[existingIndex].canAccess = newState;
      } else {
        this.updatedPermissions.push({
          userId: admin.userId,
          orgId: admin.orgId,
          permissionId: permission.permissionId,
          canAccess: newState
        });
      }
    

      this.adminService.assignPermission(this.updatedPermissions).subscribe({
        next: () => {
          console.log('Permission updated successfully');
        },
        error: () => {
          permission.canAccess = !newState; 
        }
      });
    }
    
    

    savePermissions() {
      if (this.updatedPermissions.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'No permissions were updated!',
        });
        return;
      }

      this.adminService.assignPermission(this.updatedPermissions).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Permissions updated successfully!',
          });
          this.updatedPermissions = [];  
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update permissions!',
          });
        }
      });
    }
  }
