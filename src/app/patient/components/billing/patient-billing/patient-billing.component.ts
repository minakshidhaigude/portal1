import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from 'src/app/patient/services/bill.service';
import {
  ICustomWindow,
  WindowRefService,
} from 'src/app/patient/services/window-ref.service';

@Component({
  selector: 'app-patient-billing',
  templateUrl: './patient-billing.component.html',
  styleUrls: ['./patient-billing.component.css'],
})
export class PatientBillingComponent implements OnInit {
  item: any = {};
  allList: any[];
  error: any;

  constructor(
    private zone: NgZone,
    private winRef: WindowRefService,
    private billService: BillService,
    private router: Router
  ) {
    this._window = this.winRef.nativeWindow;
  }

  ngOnInit(): void {
    const id = JSON.parse(localStorage.getItem('userDetails1')).id;
    this.billService.getBill(id).subscribe(
      (res) => {
        this.allList = res.bills;
        /* this.showList = res.bills.filter((c) => {
          return c.amount_due > 0;
        }); */
      },
      (err) => {}
    );
  }

  handleClick(id: string) {
    this.item = this.allList.filter((c) => {
      return c.order_id == id;
    });
    this.item = this.item[0];
  }

  private _window: ICustomWindow;
  public rzp: any;

  public options: any = {
    key: 'rzp_test_hVfz1a8X90NPrc',
    name: 'Patient portal - bill payment',
    description: 'Bill payment',
    amount: 100, // in paisa
    currency: 'INR',
    order_id: '',
    prefill: {
      email: JSON.parse(localStorage.getItem('userDetails1')).email,
      contact: '',
    },
    notes: {},
    theme: {
      color: '#3880FF',
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: () => {
        this.zone.run(() => {
          // add current page routing if payment fails
        });
      },
    },
  };

  initPay(amt, id): void {
    this.options.amount = amt * 100;
    this.options.order_id = '';
    /* let co = {
      amount: amt,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        key1: 'value3',
      },
    };
    if (this.options.order_id == 'aaaa')
      this.billService.createOrder(co).subscribe(
        (data) => {
          this.options.order_id = data.id;
          this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
          this.rzp.open();
          this.rzp.on('payment.failed', function (response) {
            this.error = response.error.reason;
          });
        },
        (err) => {
          this.error = err.error.message;
        }
      );
    else { */
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
    this.rzp.on('payment.failed', function (response) {
      this.error = response.error.reason;
    });
    this.options.order_id = id;
    // }
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      var event = new CustomEvent('payment.success', {
        detail: res,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    });
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    /* this.billService.fetchOrder(this.options.order_id).subscribe(
      (data) => {
      },
      (err) => {
        this.error = err.error.message;
      }
    ); */
    this.allList.forEach((item) => {
      if (item.order_id == this.options.order_id) {
        item.amount_due = 0;
      }
    });
    let obj = {
      id: JSON.parse(localStorage.getItem('userDetails1')).id,
      bills: this.allList,
    };
    this.billService.updateBillings(obj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }
}
