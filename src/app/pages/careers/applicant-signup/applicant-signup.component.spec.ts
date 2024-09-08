import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSignupComponent } from './applicant-signup.component';

describe('ApplicantSignupComponent', () => {
  let component: ApplicantSignupComponent;
  let fixture: ComponentFixture<ApplicantSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
