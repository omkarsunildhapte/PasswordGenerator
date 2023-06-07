import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  copyToClipboard() {
    const copiedValue = this.password;


    navigator.clipboard.writeText(copiedValue)
      .then(() => {
        if (copiedValue !== '') {
          alert('Value copied successfully!');
        }
      })
      .catch((error) => {
        console.error('Failed to copy value:', error);
      });
  }

  showNavigation: boolean = false;

  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }

  password: string = '';

  generatePassword() {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberValue = '0123456789'
    const symbols = '!@#$%^&*=+-?~|\/<>'


    let getPassword: string = '';
    let getlowerCase: string = '';
    let getuppercase: string = '';
    let getnumber: string = '';
    let getsymbol: string = '';

    for (let i = 1; i <= 4; i++) {
      const character = Math.floor(Math.random() * lowerCase.length);
      getlowerCase += lowerCase[character]
    }

    for (let i = 0; i <= 1; i++) {
      const character = Math.floor(Math.random() * upperCase.length)
      getuppercase += upperCase[character];
    }
    for (let i = 1; i <= 2; i++) {
      const number = Math.floor(Math.random() * numberValue.length)
      getnumber += numberValue[number];
    }
    for (let i = 1; i <= 1; i++) {
      const symbol = Math.floor(Math.random() * symbols.length)
      getsymbol += symbols[symbol];
    }
    let allChar: string = getuppercase + getlowerCase + getsymbol + getnumber;
    this.password = allChar;
  }
}
