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
function Logger(constructor : Function){
    console.log('Logggggg.....');
    console.log(constructor);    
}

@Logger

class Person{
    name = 'Khiem'
    constructor(){
        console.log('Creating person object...');        
    }
}

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


//bat loi


function validator(constructor: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]): any {

      const inputField: HTMLInputElement | null = document.getElementById("player-name") as HTMLInputElement;
  
      const errorMessage: HTMLElement | null = document.getElementById("player-name-error");
  
      if (inputField && inputField.value.trim() !== "") {
        const inputValue = inputField.value.trim();
        const minLength = 4; 
        const maxLength = 20; 
        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
        if (inputValue.length >= minLength && inputValue.length <= maxLength && !specialCharactersRegex.test(inputValue)) {
          if (errorMessage) {
            errorMessage.textContent = "";
          }
          return originalMethod.apply(this, args);
        } else {
          let errorText = `Vui lòng nhập tên tài khoản từ ${minLength} đến ${maxLength} ký tự và không chứa kí tự đặc biệt!`;
          if (errorMessage) {
            errorMessage.textContent = errorText;
          }
          return null;
        }
      } else {
        if (errorMessage) {
          errorMessage.textContent = "Vui lòng nhập tên tài khoản!";
        }
        return null;
      }
    };
  
    return descriptor;
  }
  
  
  class GamePlayer {
    @validator
    static submitPlayerName(event: Event): void {
      event.preventDefault(); 
  
      const playerName: string | null = GamePlayer.PlayerName();
  
      if (playerName) {
        localStorage.setItem("playerName", playerName);
        window.location.href = "index.html";
      }
    }
  
    static PlayerName(): string | null {

      const inputField: HTMLInputElement | null = document.getElementById("player-name") as HTMLInputElement;
  
      if (inputField && inputField.value.trim() !== "") {
        return inputField.value.trim();
      } else {
        return null;
      }
    }
  }
  
  const playerNameForm: HTMLFormElement | null = document.getElementById("player-name-form") as HTMLFormElement;
  
  if (playerNameForm) {
    playerNameForm.addEventListener("submit", GamePlayer.submitPlayerName);
  }
  
  
  
  
  