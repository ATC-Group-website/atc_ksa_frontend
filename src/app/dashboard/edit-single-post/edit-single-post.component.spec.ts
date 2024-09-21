import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSinglePostComponent } from './edit-single-post.component';

describe('EditSinglePostComponent', () => {
  let component: EditSinglePostComponent;
  let fixture: ComponentFixture<EditSinglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSinglePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
