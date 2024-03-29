//Bai 1
type Admin = {
    name : string ;
    privileges : string []
};

type Employee = {
    name : string ;
    startDate : Date;
}

type ElevateEmployee = Admin & Employee;

//Bai 2
class Car {
    drive(){
    console.log('Driving....');            
    }
}

class Truck {
    drive(){
        console.log('Driving a truck...');        
    }
    loadCargo(amount: number){
        console.log('Loading cargo ...' + amount);    
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle : Vehicle){
    vehicle.drive();
    if(vehicle instanceof Truck) {
        (vehicle as Truck).loadCargo(1000);
    }
}

useVehicle(v1); 
useVehicle(v2); 

// Bai 3
interface Bird{
    type : 'bird';
    flyingSpeed : number;
}

interface Horse {
    type : 'horse';
    runningSpeed : number ;
}

type Animal = Bird | Horse;

function moveAnimal(animal : Animal){
    let speed ;
    switch (animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed :' + speed);    
}

// Bai 4

function merge<T extends object , U extends object>(objA : T , objB : U){
    return Object.assign( objA, objB);
}

const mergeObj = merge({name :'Khiem', hobbies:['Play Game']},{age : 20});
console.log(mergeObj);


interface Lengthy{
    length:number;
}


function countAndDescribe <T extends Lengthy> (element : T ): [T , string]{
    let descriptionText = 'Go no value';
    if(element.length === 1){
        descriptionText = 'Got 1 element.'
    }else{
        descriptionText = 'Got ' + element.length + 'elements.'
    }
    return [element, descriptionText];
}


class DataStorage <T extends string | number | boolean>{
    private data : T[] = [];
    addItem(item : T){
        this.data.push(item);
    }
    removeItem(item : T){
        if(this.data.indexOf(item) === -1 ){
            return;
        }
        this.data.splice(this.data.indexOf(item),1)
    }
    getItems(){
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Khiem');
textStorage.addItem('Khim');
textStorage.removeItem('khiem');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());