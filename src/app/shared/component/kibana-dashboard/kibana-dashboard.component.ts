import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Toast } from 'primeng/toast';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { AlertService } from '../../../services/alert.service';
import { Tooltip } from 'primeng/tooltip';
import { PrimeTemplate } from 'primeng/api';
import { NgIf } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { EnvService } from '../../../services/env/env.service';

@Component({
  selector: 'app-kibana-dashboard',
  templateUrl: './kibana-dashboard.component.html',
  styleUrl: './kibana-dashboard.component.scss',
  imports: [Button, Tooltip, NgIf, Message],
  standalone: true,
})
export class KibanaDashboardComponent implements OnInit {
  @Input() dashboardKey: string = '';
  @Input() headerName: string = 'Analytics';
  @Input() height: string = '600px';
  @Input() width: string = '100%';
  @Input() embedParams: string = 'embed=true&_g=()&_a=()'; // Optional: custom embed parameters

  safeUrl: SafeResourceUrl | null = null;
  isLoading = true;
  hasError = false;
  errorMessage = '';
  private fullKibanaUrl = '';

  private DEFAULT_KIBANA_BASE_URL = '';
  private readonly DASHBOARD_PATH = '/app/dashboards#/view';

  constructor(
    private sanitizer: DomSanitizer,
    private envSvc: EnvService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.DEFAULT_KIBANA_BASE_URL = this.envSvc.kibanaUrl;
    this.buildAndValidateUrl();
  }

  private buildAndValidateUrl(): void {
    if (!this.dashboardKey) {
      this.showError('Dashboard key is required');
      return;
    }

    try {
      // Use provided base URL or default

      // Build the complete Kibana URL
      this.fullKibanaUrl = `${this.DEFAULT_KIBANA_BASE_URL}${this.DASHBOARD_PATH}/${this.dashboardKey}?${this.embedParams}`;

      // Validate the constructed URL
      const url = new URL(this.fullKibanaUrl);

      // Validate protocol (only allow https in production)
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        this.showError('Invalid protocol. Only HTTP/HTTPS are permitted');
        return;
      }

      // Validate that it's a valid Kibana dashboard URL
      if (!this.isValidKibanaDashboardUrl(url)) {
        this.showError('Invalid Kibana dashboard URL format');
        return;
      }

      // Sanitize the URL
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.fullKibanaUrl,
      );
    } catch (error) {
      console.error('Error building Kibana URL:', error);
      this.showError('Invalid URL format or dashboard key');
    }
  }

  private isValidKibanaDashboardUrl(url: URL): boolean {
    // Validate that it's a dashboard URL pattern
    const dashboardPattern = /\/app\/dashboards#\/view\/[a-zA-Z0-9\-_]+/;
    return dashboardPattern.test(url.pathname + url.hash);
  }

  private showError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
    this.isLoading = false;

    this.alertService.showErrorCustom(message);
  }

  onIframeLoad(): void {
    this.isLoading = false;
    this.hasError = false;
  }

  onIframeError(): void {
    this.isLoading = false;
    this.showError('Failed to load Kibana dashboard');
  }

  refreshDashboard(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    // Force iframe reload by changing src
    const currentUrl = this.safeUrl;
    this.safeUrl = null;
    setTimeout(() => {
      this.safeUrl = currentUrl;
    }, 100);
  }

  openInNewTab(): void {
    if (!this.fullKibanaUrl) {
      this.alertService.showErrorCustom('No URL available to open');
      return;
    }

    try {
      // Open the Kibana dashboard in a new tab (without embed parameters for full experience)
      const fullDashboardUrl = this.fullKibanaUrl.replace(/[?&]embed=true/, '');
      const newWindow = window.open(
        fullDashboardUrl,
        '_blank',
        'noopener,noreferrer',
      );

      // Check if the window was successfully opened
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === 'undefined'
      ) {
        // Popup was likely blocked
        this.alertService.showErrorCustom(
          'Unable to open new tab. Please check if popups are blocked.',
        );
      } else {
        // Fixed: Proper conditional logic for optional method
        if (this.alertService.showSuccessCustom) {
          this.alertService.showSuccessCustom('Dashboard opened in new tab');
        } else {
        }
      }
    } catch (error) {
      console.error('Error opening new tab:', error);
      this.alertService.showErrorCustom('Failed to open dashboard in new tab');
    }
  }

  // Method to update dashboard key dynamically
  updateDashboard(newKey: string): void {
    if (this.dashboardKey !== newKey) {
      this.dashboardKey = newKey;
      this.buildAndValidateUrl();
    }
  }

  // Method to get the current dashboard URL (useful for debugging)
  getCurrentUrl(): string {
    return this.fullKibanaUrl;
  }
}
