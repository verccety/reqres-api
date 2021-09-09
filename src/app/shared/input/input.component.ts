import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

type InputText = 'password' | 'text' | 'email' | 'submit';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent  {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() inputType!: InputText | null;
  @Input() controlType: 'input' = 'input';



  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
