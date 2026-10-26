import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';


@Injectable({
    providedIn: "root"
})

export class ConfirmService {

    constructor(readonly confirmationService: ConfirmationService, readonly translate:TranslateService) {}

    public modalTest() {

        this.confirmationService.confirm({
            message: "asasasa",
            header: "asasas",
            acceptLabel: 'Ya',
            rejectLabel: 'Tidak',
        })
    }
    confirmApprove(): Promise<boolean> {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmApprove"),
                header: this.translate.instant("confirmApproveHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }
    confirmReject(): Promise<boolean> {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmReject"),
                header: this.translate.instant("confirmRejectHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }

    confirmSave(): Promise<boolean> {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmSave"),
                header: this.translate.instant("confirmSaveHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }

    confirmSaveCustom(messsage:any): Promise<boolean> {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: messsage,
                header: this.translate.instant("confirmSaveHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),

                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }


    confirmDelete(): Promise<boolean> {

        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmDelete"),
                header: this.translate.instant("confirmDeleteHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }
    confirmRetry(): Promise<boolean> {

        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmRetry"),
                header: this.translate.instant("confirmRetryHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }

    confirmCancel(): Promise<boolean> {

        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: this.translate.instant("confirmCancel"),
                header: this.translate.instant("confirmCancelHeader"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }

    confirmCustomMessage(message:any): Promise<boolean> {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: message,
                header: this.translate.instant("confirm"),
                acceptLabel: this.translate.instant("yes"),
                rejectLabel: this.translate.instant("no"),
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            })
        });
    }

}
