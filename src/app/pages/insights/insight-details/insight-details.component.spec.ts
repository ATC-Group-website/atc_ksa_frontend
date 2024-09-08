import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightDetailsComponent } from './insight-details.component';

describe('InsightDetailsComponent', () => {
  let component: InsightDetailsComponent;
  let fixture: ComponentFixture<InsightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
