import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBillingsUpload } from './admin-billings-upload';

describe('AdminBillingsUpload', () => {
  let component: AdminBillingsUpload;
  let fixture: ComponentFixture<AdminBillingsUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBillingsUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBillingsUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
