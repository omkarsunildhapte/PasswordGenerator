import { Component } from '@angular/core';
import { PasswordService } from './password/password.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 15;
  max = 50;
  min = 0;
  symbols: boolean = true;
  number: boolean = true;
  smallletter: boolean = true;
  captiel: boolean = true
  mobileview: boolean = false
  generatedPassword!: string;

  constructor(private passwordGeneratorService: PasswordService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generateDefaultPassword();
  }

  generateDefaultPassword() {
    this.generatedPassword = this.passwordGeneratorService.generateDefaultPassword();
  }

  generatePassword() {
    this.generatedPassword = this.passwordGeneratorService.generatePassword({
      smallletter: this.smallletter,
      captiel: this.captiel,
      number: this.number,
      symbols: this.symbols,
    }, this.value);
  }
  copyToClipboard() {
    const copiedValue = this.generatedPassword;

    navigator.clipboard.writeText(copiedValue)
      .then(() => {
        if (copiedValue !== '') {
          this._snackBar.open('Value copied successfully!', 'Dismiss', {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Failed to copy value:', error);
      });
  }
}
