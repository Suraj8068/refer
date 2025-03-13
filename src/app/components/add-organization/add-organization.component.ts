import { Component } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent {
  org = { Name: '', Org_Loc: '' };
  organizationList: any = [];
  editMode = false;
  orgId: number | null = null;
  http: any;

  constructor(private orgService: OrganizationService) {}

  ngOnInit() {
    this.getOrganizations();
  }

  saveOrganization() {
    if (!this.org.Name || !this.org.Org_Loc) {
      Swal.fire('Warning!', 'Please fill all fields', 'warning');
      return;
    }

    if (this.editMode) {
      this.orgService.updateOrganization(this.orgId!, this.org).subscribe({
        next: () => {
          Swal.fire('Updated!', 'Organization updated successfully', 'success');
          this.refreshData();
        },
        error: () => {
          Swal.fire('Error!', 'Failed to update organization', 'error');
        }
      });
    } else {
      this.orgService.addOrganization(this.org).subscribe({
        next: () => {
          Swal.fire('Added!', 'Organization added successfully', 'success');
          this.refreshData();
        },
        error: () => {
          Swal.fire('Error!', 'Failed to add organization', 'error');
        }
      });
    }
  }

  getOrganizations(): void {
    this.orgService.getOrganizations().subscribe({
      next: (data) => {
        this.organizationList = data;
        console.log('Organizations:', data);
      },
      error: (err) => {
        console.error('Error fetching organizations:', err);
      }
    });
  }

  editOrganization(org: any) {
    this.orgId = org.orgId;
    this.org = { Name: org.name, Org_Loc: org.org_Loc };
    this.editMode = true;
  }

  deleteOrganization(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orgService.deleteOrganization(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Organization deleted successfully', 'success');
            this.getOrganizations();
          },
          error: () => {
            Swal.fire('Error!', 'Failed to delete organization', 'error');
          }
        });
      }
    });
  }

  clearForm() {
    this.org = { Name: '', Org_Loc: '' };
    this.orgId = null;
    this.editMode = false;
  }

  refreshData() {
    this.getOrganizations();
    this.clearForm();
  }
}
