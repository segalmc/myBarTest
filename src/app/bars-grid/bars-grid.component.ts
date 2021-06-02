import {Component, ElementRef, AfterViewInit, Input} from '@angular/core';
import * as moment from 'moment';
import {Moment} from "moment";

@Component({
  selector: 'app-bars-grid',
  templateUrl: './bars-grid.component.html',
  styleUrls: ['./bars-grid.component.scss']
})
export class BarsGridComponent implements AfterViewInit {
  @Input() options: any;

  private _contentHeight: number = 0;
  private numOfRows: number = 0 ;
  private jumpMinutes: number = 0;
  private durationMinutes: number = 0;
  private oneHourInPixels: number = 0;
  private containerElement: ElementRef
  private initGridTime: Moment = moment();
  rows: any[] = [];
  stackedBars: any[] = [];
  constructor(element: ElementRef) {
    this.containerElement = element;
  }

  ngAfterViewInit(): void {
    this.validateInputs();
    this._contentHeight = (<HTMLElement>this.containerElement.nativeElement).getBoundingClientRect().height;
    this.createRows(this.options.timeRange, this.options.rowHeight);
  }

  private validateInputs() {
    if(!this.options) {
      throw new Error('Expected options');
    }
    if(!(this.options.rowHeight && this.options.rowHeight > 13)) {
      throw new Error('Expected rowHeight in px (minimum value 14)');
    }

    if (!(this.options.timeRange &&
      typeof this.options.timeRange.startTime.getTime === 'function' &&
      typeof this.options.timeRange.endTime.getTime === 'function' &&
      this.options.timeRange.endTime.getTime() - this.options.timeRange.startTime.getTime() > 0)) {
      throw new Error('please provide valid range of times');
    }
  }

  calculatePlaceOfRow(time: Moment) {
    const numOfHours = moment.duration(time.diff(this.initGridTime)).asHours();
    return numOfHours * this.oneHourInPixels;
  }

  createRows(timeRange: {startTime: Date, endTime:Date}, rowHeight: number) {
    this.numOfRows = Math.round(this._contentHeight / rowHeight);
    let startGridTime = moment(timeRange.startTime).startOf('hour');
    this.initGridTime = moment(timeRange.startTime).startOf('hour');
    let endGridTime = moment(timeRange.endTime);

    this.durationMinutes = moment.duration(endGridTime.diff(startGridTime)).asMinutes();
    this.oneHourInPixels = this._contentHeight / (this.durationMinutes / 60);
    this.jumpMinutes = Math.floor(this.durationMinutes / (this.numOfRows - 1));

    const roundJumpMinutes = Math.floor(this.jumpMinutes/5) * 5; //round to nearest 5 minutes

    if (((this.jumpMinutes - roundJumpMinutes) * (this.numOfRows - 1)) < (this.jumpMinutes * 2)) {
      this.jumpMinutes = roundJumpMinutes;
    }

    this.rows.push({time: timeRange.startTime, top: this.calculatePlaceOfRow(moment(timeRange.startTime))});

    if (this.numOfRows > 2) {
      for (let i = 1; i < this.numOfRows; i += 1) {
        const newRow = startGridTime.add(this.jumpMinutes, 'minutes');
        const placeOfRow = this.calculatePlaceOfRow(newRow);
        if (placeOfRow - this.rows[this.rows.length - 1].top > 13 && (this._contentHeight - placeOfRow) > 13) {
          this.rows.push({time: newRow.toDate(), top: placeOfRow});
        }
      }
    }

    this.rows.push({time: timeRange.endTime, top: this.calculatePlaceOfRow(moment(timeRange.endTime))});
  }

  createStackedBars() {
    if (!(this.options.stackedBars && this.options.stackedBars.length > 0)) {
      return;
    }

    for(let i = 0; i < this.options.stackedBars.length; i += 1) {
      if (typeof this.options.stackedBars[i].endTime === 'function') {
        //this.options.stackedBars[i].height =
        if (i > 0) {
          if(this.options.stackedBars[i].endTime.getTime() > this.options.stackedBars[i - 1].endTime.getTime()) {
            this.stackedBars.push(this.options.stackedBars[i]);
          }
        } else {
          this.stackedBars.push(this.options.stackedBars[i]);
        }
      }
    }
  }
}
