import { Operator } from "./components/Operator";
import { Add } from "./components/Add";
import { Mul } from "./components/Mul"; 
import Validate from "./components/StaticZipCodeValidator";

//bai 3
import { Person } from "./models/person";
import { Student } from "./models/student";

const add = new Add()
console.log(add.eval(3,3));

//module
let dkhim = ["Hello","12345","102"];
dkhim.forEach((s)=>{
    console.log(`"$(s)" ${Validate(s) ? "matches" : "does not match"}`);    
})


//namespace
/// <reference path = "./components/studentCalc" />

let TotalFee = studentCalc.AnualFeeCalc(1000, 3);
console.log("Total Fee is " + TotalFee);


//bai 3
function greeter (person : Person){
    return "Hello, " + person.firstName + " " + person.lastName;
}

let student : Student = new Student("khiem","Dinh","Dang");

document.body.innerHTML = greeter(student);