import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor( private _authService: AuthService ) { }

  logOut(){
    this._authService.logout();
  }

  getUser() {
    return this._authService.getUser();
  }

}
