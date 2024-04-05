import { Operator } from "./Operator";

export class Mul implements Operator{
    eval(a : number , b : number) : number{
        return a + b;
    }
}