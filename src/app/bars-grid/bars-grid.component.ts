import {Component, ElementRef, AfterViewInit, Input, ViewChild, HostListener} from '@angular/core';
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
  private numOfRows: number = 0;

  private jumpMinutes: number = 0;
  private durationMinutes: number = 0;
  private oneHourInPixels: number = 0;
  private initGridTime: Moment = moment();
  rows: any[] = [];
  stackedBars: any[] = [];
  columnsContainerWidth: number = 0;
  customContentHeight: string = '0 0 0';

  @ViewChild('gridwrapper') gridwrapper?: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.initGrid();
  }

  constructor() {

  }

  private initGrid() {
    this._contentHeight = this.gridwrapper? (<HTMLElement>this.gridwrapper.nativeElement).getBoundingClientRect().height - 2 : 0;
    this.options.customContentHeight = this.options.customContentHeight ? this.options.customContentHeight: 0;
    this.customContentHeight = `0 0 ${this.options.customContentHeight}px`;
    this.createRows(this.options.rowHeight);
    this.createStackedBars(this.options.colWidth);
  }

  ngAfterViewInit(): void {
    this.validateInputs();
    setTimeout(() => {this.initGrid();});
  }

  private validateInputs() {
    if (!this.gridwrapper) {
      throw new Error('The component not rendered');
    }
    if (!this.options) {
      throw new Error('Expected options');
    }

    if (!(this.options.rowHeight && this.options.rowHeight > 13)) {
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

  createRows(rowHeight: number = 60) {
    this.rows = [];
    this.numOfRows = Math.round(this._contentHeight / rowHeight);
    let startGridTime = moment(this.options.timeRange.startTime).startOf('hour');
    this.initGridTime = moment(this.options.timeRange.startTime).startOf('hour');
    let endGridTime = moment(this.options.timeRange.endTime);

    this.durationMinutes = moment.duration(endGridTime.diff(startGridTime)).asMinutes();
    this.oneHourInPixels = this._contentHeight / (this.durationMinutes / 60);
    this.jumpMinutes = Math.floor(this.durationMinutes / (this.numOfRows - 1));

    const roundJumpMinutes = Math.floor(this.jumpMinutes / 5) * 5; //round to nearest 5 minutes

    if (((this.jumpMinutes - roundJumpMinutes) * (this.numOfRows - 1)) < (this.jumpMinutes * 2)) {
      this.jumpMinutes = roundJumpMinutes;
    }

    this.rows.push({time: this.options.timeRange.startTime, top: this.calculatePlaceOfRow(moment(this.options.timeRange.startTime))});

    if (this.numOfRows > 2) {
      for (let i = 1; i < this.numOfRows; i += 1) {
        const newRow = startGridTime.add(this.jumpMinutes, 'minutes');
        const placeOfRow = this.calculatePlaceOfRow(newRow);
        if (placeOfRow - this.rows[this.rows.length - 1].top > 13 && (this._contentHeight - placeOfRow) > 13) {
          this.rows.push({time: newRow.toDate(), top: placeOfRow});
        }
      }
    }

    this.rows.push({time: this.options.timeRange.endTime, top: this.calculatePlaceOfRow(moment( this.options.timeRange.endTime))});
  }

  private calculateHeight(startTime: Date, endTime: Date) {
    if (typeof startTime.getTime === 'function' && typeof endTime.getTime === 'function' && (endTime.getTime() > startTime.getTime())) {
      return this.calculatePlaceOfRow(moment(endTime)) - this.calculatePlaceOfRow(moment(startTime));
    }
    return false;
  }
  createStackedBars(colWidth: number = 180) {
    this.stackedBars = [];
    if (!(this.options.stackedBars && this.options.stackedBars.length > 0)) {
      return;
    }
    this.columnsContainerWidth = this.options.stackedBars.length * colWidth;
    for (let i = 0; i < this.options.stackedBars.length; i += 1) {
      this.options.stackedBars[i].isValid = true;
      for (let x = 0; x < this.options.stackedBars[i].length; x += 1) {
        if (x > 0) {
          this.options.stackedBars[i][x].height = this.calculateHeight(this.options.stackedBars[i][x - 1].endTime, this.options.stackedBars[i][x].endTime);
        } else {
          this.options.stackedBars[i][x].height = this.calculateHeight(this.options.timeRange.startTime, this.options.stackedBars[i][x].endTime);
        }
        if (!this.options.stackedBars[i][x].height) {
          this.options.stackedBars[i].isValid = false;
          break;
        }
      }
      if (this.options.stackedBars[i].isValid) {
        this.stackedBars.push(this.options.stackedBars[i]);
      }
    }
  }
}
