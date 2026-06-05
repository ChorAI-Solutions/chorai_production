import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');
  privacyAccepted = signal(false);
  submitted = signal(false);

  nameTouched = signal(false);
  emailTouched = signal(false);
  messageTouched = signal(false);

  get nameError(): boolean {
    return (this.nameTouched() || this.submitted()) && this.name().trim().length < 5;
  }

  get nameSuccess(): boolean {
    return this.name().trim().length >= 5;
  }

  get emailError(): boolean {
    return (this.emailTouched() || this.submitted()) && !this.isValidEmail(this.email());
  }

  get emailSuccess(): boolean {
    return this.isValidEmail(this.email());
  }

  get messageError(): boolean {
    return (this.messageTouched() || this.submitted()) && this.message().trim().length < 10;
  }

  get messageSuccess(): boolean {
    return this.message().trim().length >= 10;
  }

  get formValid(): boolean {
    return this.nameSuccess && this.emailSuccess && this.messageSuccess && this.privacyAccepted();
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  togglePrivacy(): void {
    this.privacyAccepted.set(!this.privacyAccepted());
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (!this.formValid) return;
    // TODO: send logic here
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
