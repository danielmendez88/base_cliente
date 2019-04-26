import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() onSidenavToggle = new EventEmitter<void>();

  public isAuthenticated:boolean;
  authSubscription: Subscription;
  user:User;


  constructor(private authService:AuthService ) {}

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

  toggleSidenav(){
    this.onSidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }

}
