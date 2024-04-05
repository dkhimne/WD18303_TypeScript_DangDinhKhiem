import { Person } from "./person";

export class Student implements Person {
    firstName: string;
    middleInitial: string;
    lastName: string;
    fullName: string;

    constructor(firstName: string, middleInitial: string, lastName: string) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
