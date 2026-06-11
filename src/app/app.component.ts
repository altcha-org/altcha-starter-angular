import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AltchaComponent } from "./altcha/altcha.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ReactiveFormsModule, AltchaComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './app.component.css'
})
export class AppComponent {
  onSubmit() {
    console.log('Form values', this.form.value);
  }

  title = 'altcha-starter-angular';

  form = new FormGroup({
    altcha: new FormControl(''),
    name: new FormControl(''),
    message: new FormControl(''),
  });
}
