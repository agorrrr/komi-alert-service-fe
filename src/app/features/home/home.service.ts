import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
enum LogTypeAudit {
    READ_DATA = 1,
    CREATE_DATA = 2,
    UPDATE_DATA = 3,
    DELETE_DATA = 4,
    VIEW_DATA = 5,
}
@Injectable({
    providedIn: 'root'
})
export class HomeService {
    static readonly LogTypeAudit = LogTypeAudit
    readonly LogTypeAudit = HomeService.LogTypeAudit

    constructor(readonly backend: BackendService) { }

    retriveLastActivity() {
        const url = '/auditrail-external/retriveuseract';
        return this.backend.get(url);
    }

    retriveLastActivtyByDate(data: any) {
        const url = '/bvams/activity/get-data';
        return this.backend.postAPI(url, data);
    }

    getDashboardData() {
        const url = "/monitoring/dashboard/getAll"
        return this.backend.getAPI(url);
    }
}
