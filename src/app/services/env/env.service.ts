import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Environment Service
 *
 * To switch between development and production environments:
 * Open src/environments/environment.config.ts and change IS_DEVELOPMENT flag
 */

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}

  public localMode = environment.localMode ?? false;
  public tenantCode = environment.tenantCode ?? '';
  public pageUrl = environment.pageUrl ?? '';
  public apiUrl = environment.apiUrl ?? '';
  public baseUrl = environment.baseUrl ?? '';
}
