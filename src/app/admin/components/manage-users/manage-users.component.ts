import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  data: any[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  id: any[];
  errors: any = {};
  constructor(private adminService: AdminService, private router: Router) {}
  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res) => {
        console.log('Response for all users:', JSON.stringify(res));
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
  updateUser(user: any) {
    this.adminService.updateStatus(user).subscribe(
      (res) => {
        console.log('Response for all users:', JSON.stringify(res));
      },
      (err) => {
        this.errors = err;
      }
    );
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
