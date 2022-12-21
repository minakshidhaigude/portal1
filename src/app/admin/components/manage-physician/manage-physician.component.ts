import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-physician',
  templateUrl: './manage-physician.component.html',
  styleUrls: ['./manage-physician.component.css'],
})
export class ManagePhysicianComponent implements OnInit {
  data: any[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  errors: any = {};
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res) => {
        console.log('Response for all users:', JSON.stringify(res));
        res = res.filter((item) => item.role == 'physician');
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
