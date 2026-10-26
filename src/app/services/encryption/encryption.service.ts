import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly key = CryptoJS.enc.Utf8.parse('t8rvtPbb5vLyrxwdcsMfw3n4e4LpKY+0'); 
  private readonly iv = CryptoJS.enc.Utf8.parse('8vBh/zTtFsf1cGr7'); 

  constructor() { }

  encryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
}
