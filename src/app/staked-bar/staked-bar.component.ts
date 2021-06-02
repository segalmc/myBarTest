import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-staked-bar',
  templateUrl: './staked-bar.component.html',
  styleUrls: ['./staked-bar.component.scss']
})
export class StakedBarComponent implements OnInit {
  @Input() stackedItems: any;

  objectKey = (obj:any):string => {
    return Object.keys(obj)[0] as string;
  }
  objectValue  = (obj:any):string => {
    return Object.values(obj)[0] as string;
  }
  constructor() {

  }

  ngOnInit(): void {
  }

}
