import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';
import { IEmployee } from '../interfaces/employee.interface';
import { IPerson } from '../interfaces/person.interface';
import * as _ from 'lodash';
import * as _async from 'async';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpHelperServ: HttpHelperService) {}

    getEmployees() {
        return this.httpHelperServ.get('Employees');
    }
    getEmployeeById(id: number) {
        return this.httpHelperServ.get('Employees', id);
    }
    updateEmployee(data: IEmployee, id: number) {
        return this.httpHelperServ.put('Employees', id, data);
    }
    deleteEmployee(id: number) {
        return this.httpHelperServ.delete('Employees', id);
    }
    getPeople() {
        return this.httpHelperServ.get('People');
    }
    getPersonById(id: number) {
        return this.httpHelperServ.get('People', id);
    }
    updatePerson(data: IPerson, id: number) {
        return this.httpHelperServ.put('People', id, data);
    }
    deletePerson(id: number) {
        return this.httpHelperServ.delete('People', id);
    }
    createEmploymentDetails(data: IEmployee) {
      return this.httpHelperServ.post('Employees', data);
    }
    createPersonalDetails(data: IPerson) {
      return this.httpHelperServ.post('People', data);
    }

    getAllEmployeeDetails(callback) {
        const vm = this;
        _async.waterfall([
          function getEmployees(next) {
            vm.getEmployees().subscribe( (data: IEmployee[]) => {
              next(null, data);
            }, (error) => {
              next(error, null);
            });
          },
          function getDetails(employees, next) {
            vm.getPeople().subscribe((data: IPerson[]) => {
              next(null, employees, data);
            }, (error) => {
              next(error, null);
            });
          },
          function mergeDetails(employees, details, next) {
            employees.forEach(employee => {
              employee.person = details.find(
                detail =>
                employee.personId !== null &&
                  employee.personId ===
                    detail.personId
              );
            });
            next(null, employees);
          }
        ], function done(err, results) {
            callback(err, results);
        });
        // vm.getEmployees().subscribe( (data: IEmployee[]) => {
        //   data.forEach((_data) => {
        //     vm.getDetails(_data.personId, (res: IPerson) => {
        //       console.log(res);
        //       _data.person = res;
        //     });
        //   });
        //   return of(data);
        // });
    }
    getDetails(id: number, callback) {
        this.getPersonById(id).subscribe(
            (data: IPerson) => {
                callback(data);
            },
            error => {
                callback();
            }
        );
    }
}
