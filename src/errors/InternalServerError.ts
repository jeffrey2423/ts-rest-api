import { IError } from "../interfaces/IError";

export class InternalServerError implements IError{
    public number: string;
    public message: string;
    public extraInfo: string;

    constructor(number:string,message:string, extraInfo:string){
        this.number = number;
        this.message = message;
        this.extraInfo = extraInfo
    }

}