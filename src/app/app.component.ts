import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colors = {gray: '#707070', green: '#2AB9C3', black: '#031522'};
  stackedItems = [
    {color: this.colors.gray, endTime: new Date('1/6/2021 09:00'), height: 10, tooltipData: [{Working: '7:00 - 9:20'}, {Spraying: '2:00 hrs'}, {Driving: '0:20 hrs'}]},
    {color: this.colors.black, endTime: new Date('1/6/2021 10:00'), height: 5},
    {color: this.colors.green, height: 40, endTime: new Date('1/6/2021 11:20'), tooltipData: [{Working: '9:00 - 11:20'}, {Spraying: '2:00 hrs'}, {Driving: '0:20 hrs'}]},
    {color: this.colors.black,endTime: new Date('1/6/2021 12:30'), height: 10},
    {color: this.colors.green,endTime: new Date('1/6/2021 13:35'), height: 10},
    {color: this.colors.black,endTime: new Date('1/6/2021 14:00'), height: 8, tooltipData: [{Standing: '9:20 - 10:50'}, {'Engine Off': '1:30 hrs'}, {'Engine On': '1:00 hrs'}]},
    {color: this.colors.green,endTime: new Date('1/6/2021 14:58'), height: 7},
    {color: this.colors.black,endTime: new Date('1/6/2021 17:00'), height: 5},
    {color: this.colors.green,endTime: new Date('1/6/2021 18:02'), height: 60}
  ];

  barsGridData = {
    options: {
      rowHeight: 40,
      timeRange: {
        startTime: new Date('1/6/2021 07:02'),
        endTime: new Date('1/6/2021 18:02')
      },
      stackedBars: [
        {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems},
        {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}, {stackBar: this.stackedItems}
      ]
    }
  };
}
