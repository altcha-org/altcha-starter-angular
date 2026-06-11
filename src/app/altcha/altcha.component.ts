import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, forwardRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

import 'altcha';
import type { WidgetAttributes, WidgetMethods } from 'altcha/types';

@Component({
  selector: 'app-altcha',
  standalone: true,
  templateUrl: './altcha.component.html',
  styleUrls: ['./altcha.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltchaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AltchaComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AltchaComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @ViewChild('altchaWidget', { static: true }) altchaWidget!: ElementRef;

  value = '';
  onChange: CallableFunction = () => undefined;
  onTouched: CallableFunction = () => undefined;

  ngAfterViewInit(): void {
    const el = this.altchaWidget.nativeElement as HTMLElement & WidgetAttributes & WidgetMethods;
    // The `configure` method is available once the widget is instantiated
    requestAnimationFrame(() => {
      el.configure({
        debug: true,
        test: true,
      });
    });
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: CallableFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: CallableFunction): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    if (!this.value) {
      return { required: true };
    }
    return null;
  }

  onStateChange(ev: Event) {
    const { detail } = ev as CustomEvent<{ state: 'unverified' | 'verifying' | 'verified' | 'error'; payload?: string }>;
    if (!detail) {
      return;
    }
    const { payload = '', state } = detail;
    this.value = state === 'verified' ? payload : '';
    this.onChange(this.value);
    this.onTouched();
  }
}
