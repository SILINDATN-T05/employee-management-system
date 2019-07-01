import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from 'src/app/shared/interfaces/employee.interface';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-edit-employment-details',
    templateUrl: './edit-employment-details.component.html',
    styleUrls: ['./edit-employment-details.component.scss']
})
export class EditEmploymentDetailsComponent implements OnInit {

    detailsForm: FormGroup;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private apiServ: ApiService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<EditEmploymentDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IEmployee
    ) {}

    ngOnInit() {
        this.createForm();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    isEmploymentValid() {
        const isValid =
            moment(this.detailsForm.value.employedDate).isAfter(this.data && this.data.person && this.data.person.birthDate) &&
            moment(this.detailsForm.value.employedDate).isBefore(this.detailsForm.value.terminatedDate);
        return isValid ? null : true;
    }
    updateDetails() {
        const vm = this;
        this.apiServ.updateEmployee(vm.detailsForm.value, vm.data.employeeId).subscribe(
            res => {
                vm.toastr.success(`Updated successfully!!!`, 'Update Employment Details');
                this.dialogRef.close(true);
            },
            error => {
                vm.toastr.error(`Update was unsuccessful!!!`, 'Update Employment Details');
                this.dialogRef.close();
            }
        );
    }
    private createForm() {
        this.detailsForm = this.formBuilder.group({
            employeeNumber: [this.data.employeeNumber ? this.data.employeeNumber.trim() : '', Validators.required],
            terminatedDate: [this.data.terminatedDate, Validators.required],
            employedDate: [this.data.employedDate, Validators.required]
        });
        this.detailsForm.get('employedDate').disable();
        this.detailsForm.get('terminatedDate').disable();
    }
}
