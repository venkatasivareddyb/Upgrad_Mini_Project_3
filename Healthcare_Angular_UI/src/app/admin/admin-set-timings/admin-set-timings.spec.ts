import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetTimings } from './admin-set-timings';

describe('AdminSetTimings', () => {
  let component: AdminSetTimings;
  let fixture: ComponentFixture<AdminSetTimings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSetTimings],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSetTimings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
