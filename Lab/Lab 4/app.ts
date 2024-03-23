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

// const deparment = new Department('Khiem');
// //sua thuoc tinh
// // deparment.name = "Tis";
// //truy cap thuoc tinh
// // console.log(deparment.name);
// // deparment.name = "Teo";
// //truy cap phuong thuc
// deparment.describe();
// deparment.addEmployee( 'Jách 5 Củ'); 
// deparment.printEmployeeInformation();

// class ITDepartment extends Department{
//     admins : string[];
//     constructor(name:string , admins:string[]){
//         super(name);
//         this.admins = admins;
//     }
// }

// class Deparment2 {
//     static id : string ;
//     public name : string;
//     constructor(id:string , name :string){
//         Deparment2.id = id;
//         this.name = name;
//     }
//     static mota(name:string){
//         console.log(`Department (${Deparment2.id}) : ${this.name}`);        
//     }
// }
// const department = new Deparment2("1", "IT");
// Deparment2.mota(department.name);

//bai 1
interface Addfn{
    (a : number , b : number) : number;
}

let add :Addfn;

add = (n1 : number , n2 : number) => {
    return n1 + n2;
};

let add1 = add(2 ,3);
console.log(add1);


//bai2 

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    outputName?: string;

    constructor(name?: string, outputName?: string) {
        this.name = name;
        this.outputName = outputName;
    }

    greet(phrase: string) {
        console.log(`${phrase}, ${this.name}!`);
    }
}

let user1: Greetable;
user1 = new Person("đùng", "ĐÙNG");

user1.greet('1 2 3');
console.log(user1);


//bai 3
abstract class Department {
    static fiscalYear = 2024;

    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) { }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admin: string[];
    constructor(id: string, admins: string[]) {
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

it.addEmployee('khim'); // them vao mang
it.addEmployee('KHiem');
it.printEmployeeInformation();