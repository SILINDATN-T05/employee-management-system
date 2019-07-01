import { IPerson } from './person.interface';

export interface IEmployee {
    employeeId?: number;
    personId: number;
    employeeNumber: string;
    employedDate: string | Date;
    terminatedDate: string | Date;
    person?: IPerson;
}
