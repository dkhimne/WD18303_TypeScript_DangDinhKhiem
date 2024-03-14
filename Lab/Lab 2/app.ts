//bai 1
// let number1:number= 5;
// let number2:number= 2.8;
// let phrase:string= 'Result is ';
// let permit:boolean= true;

// const result = number1 + number2;
// if (permit) {
//     console.log(phrase + result);
// }
// else{
//     console.log('Not show result');
// }

// //bai2
// function add(x :number= 5){
//     let phrase:string = "Result is ";
//     phrase = 10 ;
//     x = '2.8';
//     return phrase + x;
// }

// let result:number = add(x:10);

//demo
// const student:object = {
//     name : "Ti",
//     age : 2
// } as const;
// console.log(student);

// let hobbies : string[] = ['Sleeping', 'Eating'];

// hobbies.forEach((element : string) =>{
//     console.log(element.length);    
// })

//bai3 
// let person : {
//     name : string,
//     age:number
// }
// person ={
//     name :"Khim",
//     age :9
// }
// console.log(person.name);

//bai 4
enum Role{ADMIN , READ_ONLY , AUTHOR};
const person : {
    name : string,
    age : number,
    hobbies : string[],
    role : number,
    roletuple : [number,string,string]
}={
    name : 'Khim',
    age : 9,
    hobbies : ['Reading','Coding'],
    role : Role.ADMIN,
    roletuple:[2,'author','admin']
}
let favouriteActive : any[];
favouriteActive = [5,'Reading', true];

if(person.role === Role.AUTHOR){
    console.log('is author ');
    
}
person.roletuple.push('admin');
person.roletuple[1]='10';
person.roletuple = [0,'admin','user'];

type Combinable = Number | string ;
function combine(input1: Combinable, input2: number | string, resultConversion: 'as-number' | 'as-text') {
    let result;
    if ((typeof input1 === 'number' && typeof input2 === 'number') || resultConversion === 'as-number') {
        result = +input1 + +input2; // Chuyển đổi cả hai thành số và thực hiện phép cộng
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combineNumber = combine(30,26,'as-number');
console.log(combineNumber);

const combineStringNumber = combine('30' ,'26','as-number')
console.log(combineStringNumber);

const  combineText = combine('I love coding' , 'and reading','as-text');
console.log(combineText);


var a = null ;
console.log(a);
console.log(typeof(a));

var b;
console.log(b);
console.log(typeof(a));
console.log('undeclaredVar');

let userInput : unknown;
let userName : string;

userInput = 5;
userInput = 'TypeS';
userName = 'userInput';
userName = <string> userInput;
if(typeof userInput === 'string'){
    userName = userInput;} 