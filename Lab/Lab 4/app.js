"use strict";
// class Department{
//     public name : string;
//     private employees:string[]=[];
//     constructor(name:string){
//         this.name = name;
//     }
//     describe(){
//         console.log('Deparment: ' + this.name);        
//     }
//     addEmployee(employee:string) {
//         this.employees.push(employee);  //them vao mang
//         console.log(this.employees);             
//     }
//     printEmployeeInformation(){ 
//         for (var i=0 ;i < this.employees.length ; ++i ) {
//             console.log("Name: "+this.employees[i]);                        
//         }                    
//     }
// }
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let add1 = add(2, 3);
console.log(add1);
class Person {
    constructor(name, outputName) {
        this.name = name;
        this.outputName = outputName;
    }
    greet(phrase) {
        console.log(`${phrase}, ${this.name}!`);
    }
}
let user1;
user1 = new Person("đùng", "ĐÙNG");
user1.greet('1 2 3');
console.log(user1);
//bai 3
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2024;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admin = admins;
    }
    describe() {
        console.log('IT Deparment - ID: ', this.id);
    }
}
const employee1 = Department.createEmployee('Khim');
console.log(employee1.name, Department.fiscalYear);
const it = new ITDepartment('1', ['khim']);
it.addEmployee('khim');
it.addEmployee('KHiem');
it.printEmployeeInformation();
