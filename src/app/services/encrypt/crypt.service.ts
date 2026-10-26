import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private key = CryptoJS.enc.Utf8.parse('BSD06Jakarta');
  private iv = CryptoJS.enc.Utf8.parse('APL37Gr0gol');

  constructor() {}

  encryptObject(obj: any): string {
    const plaintext = JSON.stringify(obj);
    const encrypted = CryptoJS.AES.encrypt(plaintext, this.key, {
      iv: this.iv,
    });
    return encrypted.toString();
  }

  decryptObject(encryptedText: string): any {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, this.key, {
      iv: this.iv,
    });
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  }
}
