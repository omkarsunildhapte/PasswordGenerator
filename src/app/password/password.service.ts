import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private defaultConfig = {
    smallletter: true,
    captiel: true,
    number: true,
    symbols: true,
  };

  private characterSets: any = {
    smallletter: 'abcdefghijklmnopqrstuvwxyz',
    captiel: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbols: '!@#$%^&*=+-?~|/<>',
  };

  constructor() { }

  generateDefaultPassword(): string {
    return this.generatePassword(this.defaultConfig, 15);
  }

  generatePassword(config: any, length: number): string {
    let password = '';

    for (const type in config) {
      if (config[type]) {
        password += this.getRandomCharacters(this.characterSets[type], 1);
      }
    }

    const remainingLength = length - password.length;
    const remainingSets = Object.keys(this.characterSets).filter(
      (type) => config[type]
    );

    if (remainingLength > 0 && remainingSets.length > 0) {
      password += this.getRandomCharactersFromMultipleSets(
        remainingSets,
        remainingLength
      );
    }

    return this.shuffleString(password);
  }

  private getRandomCharacters(characterSet: string, count: number): string {
    let result = '';
    for (let i = 0; i < count; i++) {
      const character =
        characterSet[Math.floor(Math.random() * characterSet.length)];
      result += character;
    }
    return result;
  }

  private getRandomCharactersFromMultipleSets(
    sets: string[],
    count: number
  ): string {
    let result = '';
    for (let i = 0; i < count; i++) {
      const randomSet =
        sets[Math.floor(Math.random() * sets.length)];
      result += this.getRandomCharacters(
        this.characterSets[randomSet],
        1
      );
    }
    return result;
  }

  private shuffleString(str: string): string {
    const charArray = str.split('');
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    return charArray.join('');
  }
}
