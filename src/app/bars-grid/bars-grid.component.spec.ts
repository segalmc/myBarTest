import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsGridComponent } from './bars-grid.component';

describe('BarsGridComponent', () => {
  let component: BarsGridComponent;
  let fixture: ComponentFixture<BarsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
