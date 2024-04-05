import { Operator } from "./Operator";

export class Add implements Operator{
    eval(a : number , b : number) : number{
        return a + b;
    }
}