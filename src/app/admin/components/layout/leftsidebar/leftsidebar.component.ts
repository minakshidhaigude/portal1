import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css'],
})
export class LeftsidebarComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');

  constructor() {}

  ngOnInit(): void {}
}
