import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adm-header',
  templateUrl: './adm-header.component.html',
  styleUrls: ['./adm-header.component.css'],
})
export class AdmHeaderComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['sidebar']) {
        this.title = params['sidebar'];
      } else {
        this.title = 'Admin Dashboard';
      }
    });
  }
}
