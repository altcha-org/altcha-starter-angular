import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AltchaComponent } from "./altcha/altcha.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, AltchaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
