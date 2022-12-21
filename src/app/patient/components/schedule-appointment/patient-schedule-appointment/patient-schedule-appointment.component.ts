import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfDay,
  endOfDay,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ScheduleService } from 'src/app/patient/services/schedule.service';

//import { id, physician, specialityid } from '../services/physician.service';
//import db from '../../../../server/db.json';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'app-patient-schedule-appointment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-schedule-appointment.component.html',
  styleUrls: ['./patient-schedule-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PatientScheduleAppointmentComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');

  bookappointmentForm = new FormGroup({
    physicianid: new FormControl(''),
    date: new FormControl(''),
    appointmentid: new FormControl(''),
  });

  submitted = false;

  [x: string]: any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalBookappoinment', { static: true })
  modalBookappoinment: TemplateRef<any>;

  view: CalendarView | CalendarPeriod = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  minDate: Date = subMonths(new Date().setDate(new Date().getDate() - 1), 0);

  maxDate: Date = addMonths(new Date(), 12);

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  closeResult: string;
  modalService: any;

  constructor(
    private modal: NgbModal,
    private ps: ScheduleService,
    private formBuilder: FormBuilder
  ) {
    this.dateOrViewChanged();
  }

  columns = ['Physician Id', 'Physician Name', 'Speciality'];
  index = ['id', 'physician', 'specialityid'];

  physician: any = [];

  // increment(): void {
  //   this.changeDate(addPeriod(this.view, this.viewDate, 0));
  // }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      console.log('bk', this.bookappointmentForm.controls);
      this.bookappointmentForm.controls['physicianid'].setValue('');
      this.bookappointmentForm.controls['appointmentid'].setValue('');
      this.modal.open(this.modalBookappoinment, { size: 'md' });
      var date = new Date(date);
      var d =
        date.getFullYear() +
        '-' +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)) +
        '-' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        ' ' +
        date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0') +
        ':' +
        date.getSeconds().toString().padStart(2, '0');

      // alert(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
      this.bookappointmentForm.controls['date'].setValue(d);
    }
    console.log(this.viewDate);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log('event click', action, event);
    if (action === 'Deleted') return this.deleteEvent(event);

    // this.modal.open(this.modalContent, { size: 'lg' });
    this.viewDate = event.start;
    if (action === 'Edited')
      this.modal.open(this.modalBookappoinment, { size: 'md' });

    var date = new Date(event.start);
    var d =
      date.getFullYear() +
      '-' +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '-' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0');

    // alert(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    this.bookappointmentForm.controls['date'].setValue(d);
    this.bookappointmentForm.controls['physicianid'].setValue(
      event.meta.physicianid
    );
    this.bookappointmentForm.controls['appointmentid'].setValue(event.meta.id);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        //physician: physician,
        meta: {
          id: 1,
        },
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    //this.events = this.events.filter((event) => event !== eventToDelete);
    this.ps.deleteAppointentsById(eventToDelete.meta.id).subscribe(
      (response) => {
        this.loadEvents();
      },
      (error) => console.log(error)
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onChange(deviceValue: any) {
    console.log('Speciality data:', deviceValue);
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    this.loadEvents();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  loadEvents(): void {
    this.events = [];
    this.ps.getAppointents().subscribe(
      (response) => {
        for (let ap of response) {
          var date = new Date(ap.date);
          var d =
            date.getFullYear() +
            '-' +
            (date.getMonth() > 8
              ? date.getMonth() + 1
              : '0' + (date.getMonth() + 1)) +
            '-' +
            (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
            ' ' +
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0') +
            ':' +
            date.getSeconds().toString().padStart(2, '0');
          let evt = {
            start: new Date(d),
            meta: { id: ap.id, physicianid: ap.physicianid, date: ap.date },
            end: new Date(d),
            title: 'Appointment - ' + ap.id,
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };
          this.events.push(evt);
        }
        this.refresh.next();
      },
      (error) => console.log(error)
    );
  }
  ngOnInit(): void {
    this.bookappointmentForm = this.formBuilder.group({
      physicianid: ['', Validators.required],
      date: ['', Validators.required],
      appointmentid: [''],
    });

    this.ps.getPhysicians().subscribe(
      (response) => {
        this.physician = response;
      },
      (error) => console.log(error)
    );

    // this.results = [...this.events, ...this.physician];
    // console.log('My Data', this.results);
    //ar events1 = this.events.concat(this.physician);

    // console.log('Id:', this.meta.id);
    this.loadEvents();
    console.log('Data Events:', this.events);
    console.log('Physician data:', this.physician);
  }
  get f() {
    return this.bookappointmentForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.bookappointmentForm.invalid) {
      return;
    }
    console.log('this.bookappointmentForm', this.bookappointmentForm);

    let patientjson = {
      patientid: this.userDetail.id,
      patientname: this.userDetail.fname + this.userDetail.lname,
      phone: this.userDetail.mobile,
      age: '',
      time: '',
      apptype: 'WalkIn',
      status: 'pending',
      date: this.bookappointmentForm.value.date,
      // date1: new Date(this.bookappointmentForm.value.date + ':00').getTime(),
      physicianid: this.bookappointmentForm.value.physicianid,
    };
    // let merged: any = Object.assign(
    //   this.bookappointmentForm.value,
    //   patientjson
    // );
    if (this.bookappointmentForm.value.appointmentid) {
      this.ps
        .editAppointment(
          this.bookappointmentForm.value.appointmentid,
          patientjson
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.loadEvents();
          },
          (error) => console.log(error)
        );
    } else {
      this.ps.createAppointment(patientjson).subscribe(
        (response) => {
          console.log(response);
          this.loadEvents();
        },
        (error) => console.log(error)
      );
    }
  }
}
