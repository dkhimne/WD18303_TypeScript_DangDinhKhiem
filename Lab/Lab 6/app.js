"use strict";
// function CheckStringLength(numberOfLength : number){
//     return function(constructor : Object , propertyName : string){
//         const getValue = function(){}
//         const setValue = function(newValue : string){
//             if(newValue.length <= numberOfLength){
//                 console.log(`${propertyName} ${newValue} qua ngan , ${propertyName} phai > ${numberOfLength} ky tu`);                 
//             }
//             else{
//                 console.log("Gia tri nay da duoc cap  nhat");                
//             }
//         };
//         Object.defineProperty(constructor , propertyName,{
//             get : getValue,
//             set : setValue,
//         })
//     }
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// class User{
//     public username : string ;
//     @CheckStringLength(7)
//     public password : string;
//     constructor(username : string , password : string){
//         this.username = username;
//         this.password = password;
//     }
// }
// let user = new User("anh khiem dtrai ","okchuaaa")
// bai1 
function Logger(constructor) {
    console.log('Logggggg.....');
    console.log(constructor);
}
let Person = class Person {
    constructor() {
        this.name = 'Khiem';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger
], Person);
const pers = new Person();
console.log(pers);
//Bai 2
// function Logger(logString : string ){
//     return function(constructor : Function){
//         console.log(logString);
//         console.log(constructor);                
//     }
// }
// @Logger('Logging - Person')
// class Person{
//     name = 'Khiem';
//     constructor(){
//         console.log('Creating person object...');          
//     }
// }
//Bai 3
// function Log(target : any , propertyName : string | Symbol){
//     console.log('Property decorator!');
//     console.log(target, propertyName);    
// }
// class Product{
//     @Log
//     title : string ;
//     private _price : number;
//     set price(val : number){}
//     constructor(t : string , p : number){
//         this.title =  t;
//         this._price = p;
//     }
//     getPriceWithAx(){}
// }
//Bai 4 
// function Log3(target : any , name : string | Symbol , descriptor : PropertyDescriptor){
//     console.log('Method decorator!');
//     console.log(target);
//     console.log(name);
//     console.log(descriptor);                
// }
// class Product{
//     title : string ;
//     private _price : number;
//     set price(val : number){}
//     constructor(t : string , p : number){
//         this.title =  t;
//         this._price = p;
//     }
//     @Log3
//     getPriceWithAx(){}
// }
//Bai 5 
// function Autobind(_: any , _2:string , descriptor : PropertyDescriptor){
//     const originalMethod = descriptor.value;
//     const adjDescriptor : PropertyDescriptor = {
//         configurable : true,
//         enumerable : false,
//         get(){
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         }
//     }
//     return adjDescriptor;
// }
// class Printer{
//     message = 'This works';
//     @Autobind
//     showMessage(){
//         console.log(this.message);        
//     }
// }
// const p = new Printer();
// p.showMessage();
// const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage);
