import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css'],
})
export class ManagePatientsComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}
  ngOnInit(): void {}
}
