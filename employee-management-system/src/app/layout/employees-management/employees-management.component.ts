import { Component, OnInit, ViewChild } from '@angular/core';
import { IEmployee } from 'src/app/shared/interfaces/employee.interface';
import { IPerson } from 'src/app/shared/interfaces/person.interface';
import { CreateEmployeesComponent } from '../components/dialogs/create-employees/create-employees.component';
import { ApiService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { EditEmploymentDetailsComponent } from '../components/dialogs/edit-employment-details/edit-employment-details.component';
import { EditPersonalDetailsComponent } from '../components/dialogs/edit-personal-details/edit-personal-details.component';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
    selector: 'app-employees-management',
    templateUrl: './employees-management.component.html',
    styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent implements OnInit {
    displayedColumns: string[] = [
        'person.lastName',
        'person.firstName',
        'person.birthDate',
        'employeeNumber',
        'employedDate',
        'terminatedDate',
        'menu'
    ];
    dataSource = new MatTableDataSource<IEmployee>([]);
    loading = false;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private confirmationDialogService: ConfirmationDialogService,
        public dialog: MatDialog,
        public apiServ: ApiService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.dataSource.filterPredicate = (data, filter) => {
            const dataStr =
                data.employedDate +
                data.employeeNumber.toLowerCase() +
                data.terminatedDate +
                data.person.firstName.toLowerCase() +
                data.person.lastName.toLowerCase() +
                data.person.birthDate;
            return dataStr.indexOf(filter.toLowerCase()) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'person.lastName':
                    return item.person.lastName;
                case 'person.firstName':
                    return item.person.firstName;
                case 'person.birthDate':
                    return item.person.birthDate;
                default:
                    return item[property];
            }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getEmployees();
    }

    getEmployees() {
        const vm = this;
        vm.loading = true;
        this.apiServ.getAllEmployeeDetails((error, employees) => {
            vm.loading = false;
            if (!error) {
                vm.dataSource.data = employees;
            } else {
                vm.toastr.error('Technical error occured, please try again!', 'Employees!');
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    editEmploymentDetails(data: IEmployee): void {
        const dialogRef = this.dialog.open(EditEmploymentDetailsComponent, { data: data });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEmployees();
            }
        });
    }
    editPersonalDetails(data: IPerson): void {
        const dialogRef = this.dialog.open(EditPersonalDetailsComponent, { data: data });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEmployees();
            }
        });
    }
    addEmployee(): void {
        const dialogRef = this.dialog.open(CreateEmployeesComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEmployees();
            }
        });
    }

    deleteEmployee(emp: IEmployee) {
        const vm = this;
        this.apiServ.deleteEmployee(emp.employeeId).subscribe(
            (res: IPerson) => {
                if (res) {
                    vm.apiServ.deletePerson(emp.personId).subscribe((data: IEmployee) => {
                        if (data) {
                            vm.toastr.success(
                                `Deleting ${emp.person.lastName} ${emp.person.firstName} was successful!!!`,
                                'Delete Employee'
                            );
                            vm.getEmployees();
                        } else {
                            vm.toastr.error(
                                `Deleting ${emp.person.lastName} ${emp.person.firstName} was unsuccessful!!!`,
                                'Delete Employee'
                            );
                        }
                    });
                } else {
                    vm.toastr.error(`Deleting ${emp.person.lastName} ${emp.person.firstName} was unsuccessful!!!`, 'Delete Employee');
                }
            },
            error => {
                console.log(error);
                vm.toastr.error(`Deleting ${emp.person.lastName} ${emp.person.firstName} was unsuccessful!!!`, 'Delete Employee');
            }
        );
    }

    openConfirmationDialog(data: IEmployee) {
        const vm = this;
        vm.confirmationDialogService
            .confirm('Please confirm..', `Do you really want to delete ${data.person.lastName} ${data.person.firstName} ... ?`)
            .then(confirmed => {
                if (confirmed) {
                    vm.deleteEmployee(data);
                } else {
                    vm.toastr.info('Delete canceled', 'Delete Employee');
                }
            })
            .catch(() => {
                vm.toastr.info('Delete canceled', 'Delete Employee');
            }); // console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
}
