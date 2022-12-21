import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared-component/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails1');

    this.router.navigate(['/user/login']);
  }
}
