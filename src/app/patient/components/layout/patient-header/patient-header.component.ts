import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css'],
})
export class PatientHeaderComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');
  constructor() {}

  ngOnInit(): void {}
}
