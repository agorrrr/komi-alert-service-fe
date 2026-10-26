import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvService } from 'src/app/services/env/env.service';
import { MetadataService } from 'src/app/services/metadata/metadata.service';

const requestOptions = { withCredentials: true };

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    readonly httpClient: HttpClient,
    readonly environment: EnvService,
    readonly metadataService: MetadataService,
  ) {}

  isIFrame: any;
  baseUrl: any;
  apiUrl: any;

  init() {
    this.isIFrame = this.metadataService.getIsIFrame();
    this.baseUrl = this.environment.baseUrl;
    this.apiUrl = this.environment.apiUrl;
  }

  post(path: string, payload: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.apiUrl + path;

    return this.httpClient
      .post(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  get(path: string, params?: HttpParams): Observable<any> {
    this.init();
    const url = this.apiUrl + path;

    return this.httpClient
      .get(url, { withCredentials: true, params })
      .pipe(catchError(this.handleError));
  }

  put(path: string, payload?: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.apiUrl + path;
    return this.httpClient
      .put(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  patch(path: string, payload?: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.apiUrl + path;
    return this.httpClient
      .patch(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  delete(path: string, payload?: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.apiUrl + path;
    return this.httpClient
      .delete(url, payload)
      .pipe(catchError(this.handleError));
  }

  postAPI(path: string, payload: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.baseUrl + path;

    return this.httpClient
      .post(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  postAPIDownload(path: string, payload: any): Observable<any> {
    this.init();
    const url = this.baseUrl + path;

    const requestOptions = {
      responseType: 'blob' as 'json',
      withCredentials: true,
    };

    return this.httpClient
      .post(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  getAPI(path: string, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.baseUrl + path;

    return this.httpClient
      .get(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  getAPIDownload(
    path: string,
    authorized?: boolean,
    httpOptions?: any,
  ): Observable<any> {
    this.init();
    const url = this.baseUrl + path;
    return this.httpClient
      .get(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  postUpload(path: string, formData?: any): Observable<any> {
    this.init();
    const url = this.baseUrl + path;

    return this.httpClient
      .post(url, formData, requestOptions)
      .pipe(catchError(this.handleError));
  }

  putAPI(path: string, payload?: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.baseUrl + path;
    return this.httpClient
      .put(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  patchAPI(path: string, payload?: any, authorized?: boolean): Observable<any> {
    this.init();
    const url = this.baseUrl + path;
    return this.httpClient
      .patch(url, payload, requestOptions)
      .pipe(catchError(this.handleError));
  }

  deleteAPI(
    path: string,
    payload?: any,
    authorized?: boolean,
  ): Observable<any> {
    this.init();
    const url = this.baseUrl + path;
    return this.httpClient
      .delete(url, { withCredentials: true, body: payload })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
