import { Component, OnInit } from '@angular/core';
declare function myScripts(): any;
@Component({
  selector: 'app-adm-main-content',
  templateUrl: './adm-main-content.component.html',
  styleUrls: ['./adm-main-content.component.css'],
})
export class AdmMainContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    myScripts();
  }
}
