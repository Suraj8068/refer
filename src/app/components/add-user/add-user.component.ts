import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { UserService } from '../../services/user.service';
import { OrganizationService } from '../../services/organization.service';  // ✅ Import OrganizationService

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  organizations: any[] = [];
  editingUserId: number | null = null; 

  constructor(private userService: UserService, private fb: FormBuilder,private orgService: OrganizationService) {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      OrgId: ['', Validators.required],
      RoleId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadOrganizations();
  

  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  loadOrganizations() {
    this.orgService.getOrganizations().subscribe((data: any[]) => {  

      this.organizations = data;
    });
  }
  
  getOrganizationName(orgId: number): string {
    const org = this.organizations.find(o => o.orgId === orgId);
    return org ? org.name : 'Unknown';
  }
  
  
  
  

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(() => {
        Swal.fire('Success!', 'User Added Successfully', 'success');
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  updateUser() {
    console.log("Editing UserId:", this.editingUserId);
    console.log("Form Data Before Submit:", this.userForm.value);
  
    if (this.userForm.valid && this.editingUserId !== null) {
      let updatedUser = { ...this.userForm.value, UserId: this.editingUserId };
  
      console.log("Updating User:", updatedUser);
  
      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log("Update Response:", response);
          Swal.fire('Success!', 'User Updated Successfully', 'success');
          this.loadUsers();
          this.resetForm();
        },
        error: (error) => {
          console.error("Update Error:", error);
          if (error.status === 401) {
            Swal.fire('Error', 'Unauthorized! Please log in again.', 'error');
            this.resetForm();

          }
        }
      });
    } else {
      console.error(" Form Invalid or EditingUserId NULL");
    }
  }
  
  


editUser(user: any) {
 // console.log('Editing User:', user);
  this.editingUserId = user.userId;

  this.userForm.setValue({
    Name: user.name || '',
    Email: user.email || '',
    Password: user.password || '',  
    OrgId: user.orgId || '',
    RoleId: user.roleId || ''
  });

  // console.log('Form Data After Patch:', this.userForm.value);
}



  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.loadUsers();
        });
      }
    });
  }

  resetForm() {
    this.userForm.reset();
    this.editingUserId = null;
  }
}
