let hihi = (num : number):boolean => {
    return (num % 2) === 0 ? true : false;
  };
  
  console.log(hihi(4));

const sum = (x : number, y:number) =>{
    return x+y;
}
console.log(sum(1,2));


const haha = (output : string|number) => {
    console.log(output);

    //kh co return thi no la void
}
haha(2);
haha('hai');    

const hello = (msg:string = "Hihi"):string => {
    return `Hello ${msg}`;
}
console.log(hello());
console.log(hello("Hai"));

let sumnuane = (x:number=5 ,y?:number) => {
    return x + <number>y;
}
const huhu = (output:string|number)=>{
    console.log("kq = "+ output);
}
huhu(sumnuane(2));
huhu(sumnuane(undefined,2));
huhu(sumnuane(2,3));

let person :{
    name : string ,
    age : number 
}={
    name: "Khim",
    age:10
}

const salary :{
    grade : string ,
    basic : string
}={
    grade : "A",
    basic : "100$"
}
const sumary = {...person , ...salary}
console.log(sumary);

// Bai 1
//1.1
// Function
function Sum1(): number {
    return 5 + 10;
}

// Arrow Function
const Sum2 = (): number => {
    return 5 + 10; 
};

console.log(Sum1()); 
console.log(Sum2()); 

//1.2
// Arrow Function
const sum3 = (a: number, b: number = 0, ...value: number[]): number => {
    let total = a + b;
    for (const num of value) {
        total += num;
    }
    return total;
};

console.log(sum3(1)); 
console.log(sum3(1, 2));
console.log(sum3(1, 2, 3));
console.log(sum3(1, 2, 3, 4)); 

//1.3
const hobbies = ['Sports','Sleeping'];
const activehobbies = ['Hiking'];
activehobbies.push('hobbies');
activehobbies.push('hobbies[0],hobbies[1]');
activehobbies.push(...hobbies);
console.log(activehobbies);

// Bai 2
//2.1 function & void
let sum4 = (x:number=5 ,y?:number) => {
    return x + <number>y;
}
const hic = (output:any) : void => {
    console.log("kq = "+ output);
}
hic(sum4(3,7));
console.log(hic(sum(4,6)));

//2.2 never & void
let something : void = undefined;
let nothing : never ;
function throwError(errorMsg : string): never{
    throw new Error(errorMsg);
}

//2.3 function & callback
function AddandHandle(x : number , y : number, cb:(number : number)=>void){
    const result = x + y;
    cb(result);
}
AddandHandle(3,4,(result)=>{
    console.log(result);    
})

//bai 3
//Arrown function
const nhanDoi = (num: number): number => {
    return num * 2;
};

console.log(nhanDoi(3));
// so sánh cách viết arrown function và function : 
//Arrown function cú pháp: () => {} và  không có từ khóa function.
//Function cú pháp: function functionName() {} hoặc const functionName = function() {} và sử dụng từ khóa function.

//Function return
function sum5(a: number, b: number): number {
    return a + b;
}

console.log(sum5(2,3)); 

//dao nguoc chuoi
function daoNguoc(input: string): string {
    return input.split('').reverse().join('');
}

console.log(daoNguoc('Dkhim Ne')); 

//Function as types
//Để định nghĩa một loại dữ liệu (type) cho một hàm có thể nhận vào hai số và trả về một số trong TypeScript
//ta có thể sử dụng kiểu dữ liệu type hoặc interface

type Sum3 = (a: number, b: number) => number;

const add: Sum3 = (x, y) => {
    return x + y;
};

console.log(add(5, 10));

//Function with parameters
function Sum4(numbers: number[]): number {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }
  const numbers = [2, 4, 6 ,8];
  console.log(Sum4(numbers));
  
  // so khong xac dinh tham so
  function Sum5(...numbers: number[]): number {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }
  
  console.log(Sum5(1,3,5,7)); 
  
//Default parameter
function binhPhuong(number: number = 2): number {
    return number * number;
  }
  
  console.log(binhPhuong());   
  console.log(binhPhuong(3)); 

  const Sum6 = (a: number, b: number = 0): number => {
    return a + b;
}
console.log(Sum6(2));
console.log(Sum6(2,3));

//Optional parameter
const vaLue =(value?: number): number => {
    return value?? 10;    
}

console.log(vaLue()); 
console.log(vaLue(20)); 

//Spread operators
function Sum7(...numbers: number[]): number {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }
  
  const so = [1, 2, 3, 4, 5];
  console.log(Sum7( ...so)); 
  
// Hàm nhận số lượng biến đối số
  function Sum8(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((number) => {
      total += number;
    });
    return total;
  }
  
  console.log(Sum8(1,2,3));

//Function & void
const noVoid = () : void => {
    console.log("Hihihhihihih");
  }
  
noVoid();
  
const noNhannoReturn = (): void => {
    
  };

//Rest parameter
function Sum9(...numbers: number[]): number {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }
  
  console.log(Sum9(1,5,7));

//Never & void
//So sanh : Never: Kiểu never biểu thị một giá trị không bao giờ có thể xảy ra
//          Void: Kiểu void biểu thị một giá trị không tồn tại

//khong bh hoan thanh
function throwError2(message: string): never {
    throw new Error(message);
  }

//kh return
const noVoid2 = () : void => {
    console.log("Hihihhihihih");
  }
  
noVoid2();