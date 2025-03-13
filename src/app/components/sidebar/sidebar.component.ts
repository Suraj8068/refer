import { Component } from '@angular/core';
//import { JwtHelperService } from '../../services/jwt-helper.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  role: any;    
  roleId: any;  

  constructor(
   // private jwtHelper: JwtHelperService,
    private authService: AuthService   
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token'); 
    if (token) {
      //const decoded = this.jwtHelper.decodeToken(token);
     // this.role = decoded.RoleId;   
      console.log("Sidebar Role from Token:", this.role);
    }

    this.roleId = this.authService.getRoleId(); 
    //console.log("Sidebar RoleId from Service: ", this.roleId);
  }
}
