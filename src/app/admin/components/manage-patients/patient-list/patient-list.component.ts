import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  data: any[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  errors: any = {};
  constructor(private adminService: AdminService, private router: Router) {}
  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res) => {
        res = res.filter((item) => item.role == 'patient');
        this.data = res;
        this.dtTrigger.next();
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 20],
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
