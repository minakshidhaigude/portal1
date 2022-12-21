import { Component, Input, OnInit } from '@angular/core';
declare function myTable(): any;
declare function myScripts(): any;
@Component({
  selector: 'app-phy-main-content',
  templateUrl: './phy-main-content.component.html',
  styleUrls: ['./phy-main-content.component.css'],
})
export class PhyMainContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    myScripts();
  }
}
