import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { IPerson } from 'src/app/shared/interfaces/person.interface';
import { ApiService } from 'src/app/shared/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-edit-personal-details',
    templateUrl: './edit-personal-details.component.html',
    styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit {

    detailsForm: FormGroup;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private apiServ: ApiService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<EditPersonalDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IPerson
    ) {
        console.log(data);
    }

    ngOnInit() {
        this.createForm();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    updateDetails() {
        const vm = this;
        this.apiServ.updatePerson(vm.detailsForm.value, vm.data.personId).subscribe((res) => {
            vm.toastr.success(`Updated successfully!!!`, 'Update Personal Details');
            this.dialogRef.close(true);
        }, (error) => {
            vm.toastr.error(`Update was unsuccessful!!!`, 'Update Personal Details');
            this.dialogRef.close();
        });
    }
    private createForm() {
        this.detailsForm = this.formBuilder.group({
            firstName: [this.data.firstName ? this.data.firstName.trim() : '', Validators.required],
            lastName: [this.data.lastName ? this.data.lastName.trim() : '', Validators.required],
            birthDate: [{value: this.data.birthDate, disabled: true}, Validators.required],
        });
    }
}
