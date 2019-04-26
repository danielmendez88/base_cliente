import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() onCloseSidenav = new EventEmitter<void>();

  isAuthenticated:boolean = false;
  user: User;

  authSubscription:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuth();
    console.log(this.isAuthenticated);
    this.authSubscription = this.authService.authChange.subscribe(
      status => {
        this.isAuthenticated = status;
      }
    );
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
  
  logout(){
    this.authService.logout();
  }
  
  close(){
    this.onCloseSidenav.emit()
  }

}
