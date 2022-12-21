import { Component, OnInit } from '@angular/core';
declare function myScripts(): any;
@Component({
  selector: 'app-patient-main-content',
  templateUrl: './patient-main-content.component.html',
  styleUrls: ['./patient-main-content.component.css'],
})
export class PatientMainContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    myScripts();
  }
}
