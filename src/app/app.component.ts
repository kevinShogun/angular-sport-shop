import { Component } from '@angular/core';
// import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent {
  title = 'sportShopApp';

  // constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.authService
  //     .checkAuthentication()
  //     .subscribe(() => console.log('auth ready'));
  // }
}
