import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakedBarComponent } from './staked-bar.component';

describe('StakedBarComponent', () => {
  let component: StakedBarComponent;
  let fixture: ComponentFixture<StakedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakedBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
