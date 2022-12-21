import { Component } from '@angular/core';
import { AuthService } from './shared-component/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portal1';
  constructor(public authService: AuthService) {}
}
