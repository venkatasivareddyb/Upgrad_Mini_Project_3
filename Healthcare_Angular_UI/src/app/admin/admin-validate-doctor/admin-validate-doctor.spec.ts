import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminValidateDoctor } from './admin-validate-doctor';

describe('AdminValidateDoctor', () => {
  let component: AdminValidateDoctor;
  let fixture: ComponentFixture<AdminValidateDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminValidateDoctor],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminValidateDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
