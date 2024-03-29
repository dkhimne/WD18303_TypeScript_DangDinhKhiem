"use strict";
//Bai 2
class Car {
    drive() {
        console.log('Driving....');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo ...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed :' + speed);
}
// Bai 4
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Khiem', hobbies: ['Play Game'] }, { age: 20 });
console.log(mergeObj);
function countAndDescribe(element) {
    let descriptionText = 'Go no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    else {
        descriptionText = 'Got ' + element.length + 'elements.';
    }
    return [element, descriptionText];
}
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Khiem');
textStorage.addItem('Khim');
textStorage.removeItem('khiem');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());
