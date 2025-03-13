import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userForm: FormGroup;
  users: any[] = [];
  organizations: any[] = [];
  editingUserId: number | null = null; 

  constructor(private userService: UserService, private fb: FormBuilder) {
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
    this.userService.getOrganizations().subscribe((data: any[]) => {
      this.organizations = data;
    });
  }
  getOrganizationName(orgId: number): string {
    const org = this.organizations.find(o => o.orgId === orgId);
    return org ? org.name : 'N/A';  // Agar organization nahi mili toh 'N/A' show karega
  }
    

 
}
