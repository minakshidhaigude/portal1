import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-leftbar',
  templateUrl: './patient-leftbar.component.html',
  styleUrls: ['./patient-leftbar.component.css'],
})
export class PatientLeftbarComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');

  constructor() {}

  ngOnInit(): void {}
}
