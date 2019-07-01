import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { IEmployee } from 'src/app/shared/interfaces/employee.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPerson } from 'src/app/shared/interfaces/person.interface';
import * as moment from 'moment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-create-employees',
    templateUrl: './create-employees.component.html',
    styleUrls: ['./create-employees.component.scss']
})
export class CreateEmployeesComponent implements OnInit {
    isLinear = true;
    personalForm: FormGroup;
    employmentForm: FormGroup;
    employees: IEmployee[] = [];
    details: IPerson[] = [];
    empId = 1;
    perId = 1;

    constructor(
        private formBuilder: FormBuilder,
        private apiServ: ApiService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<CreateEmployeesComponent>
    ) {}

    ngOnInit() {
        this.getDetails();
        this.createForm();
    }

    getDetails() {
        this.apiServ.getEmployees().subscribe((data: IEmployee[]) => {
            this.employees = data;
            this.empId = data.length > 0 ? data[data.length - 1].employeeId + 1 : this.empId;
        });
        this.apiServ.getPeople().subscribe((data: IPerson[]) => {
            this.details = data;
            this.empId = data.length > 0 ? data[data.length - 1].personId + 1 : this.perId;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    isEmploymentValid() {
        const isValid =
            moment(this.employmentForm.value.employedDate).isAfter(this.personalForm.value.birthDate) &&
            moment(this.employmentForm.value.employedDate).isBefore(this.employmentForm.value.terminatedDate);
        return isValid ? null : true;
    }

    createEmployee() {
        const vm = this;
        const personalDetails: IPerson = vm.personalForm.value;
        personalDetails.birthDate = moment(personalDetails.birthDate).format('YYYY/MM/DD');
        // tslint:disable-next-line:radix
        personalDetails.personId = this.perId;
        const employmentDetails: IEmployee = vm.employmentForm.value;
        // tslint:disable-next-line:radix
        employmentDetails.employeeId = this.empId;
        employmentDetails.employedDate = moment(employmentDetails.employedDate).format('YYYY/MM/DD');
        employmentDetails.terminatedDate = moment(employmentDetails.terminatedDate).format('YYYY/MM/DD');
        this.apiServ.createPersonalDetails(vm.personalForm.value).subscribe(
            (res: IPerson) => {
                if (res) {
                    employmentDetails.personId = res.personId;
                    vm.apiServ.createEmploymentDetails(employmentDetails).subscribe((data: IEmployee) => {
                        if (data) {
                            vm.toastr.success(`Employment details was added successfully!!!`, 'Add Employee');
                            this.dialogRef.close(true);
                        } else {
                            vm.toastr.error(`An error ocuured!!!`, 'Add Employee');
                            this.dialogRef.close();
                        }
                    });
                } else {
                    vm.toastr.error(`An error ocuured!!!`, 'Add Employee');
                    this.dialogRef.close();
                }
            },
            error => {
                console.log(error);
                vm.toastr.error(`An error ocuured!!!`, 'Add Employee');
                this.dialogRef.close();
            }
        );
    }

    private createForm() {
        this.personalForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required]
        });
        this.employmentForm = this.formBuilder.group({
            employeeNumber: ['', Validators.required],
            terminatedDate: ['', Validators.required],
            employedDate: ['', Validators.required],
            personId: null
        });
    }
}
