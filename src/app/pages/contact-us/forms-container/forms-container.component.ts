import { CommonModule } from '@angular/common';
import { FormComponent } from './../form/form.component';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-forms-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forms-container.component.html',
  styleUrl: './forms-container.component.css',
})
export class FormsContainerComponent implements AfterContentInit {
  @ContentChildren(FormComponent) forms!: QueryList<FormComponent>;

  ngAfterContentInit() {
    const activeTabs = this.forms.filter((form) => form.isActive);
    if (activeTabs.length === 0) {
      this.selectForm(this.forms.first);
    }
  }

  selectForm(form: FormComponent) {
    this.forms.toArray().forEach((f) => (f.isActive = false));
    form.isActive = true;
  }
}
