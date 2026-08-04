export interface CardIndexInterface {
    x: number;
    y: number;
    isSame(item : CardIndexInterface) : boolean;
    sSameCoradinate(x: number, y: number) : boolean;
}

export class CardIndex implements CardIndexInterface {
    x: number;
    y: number;
    constructor(x:number, y:number) {
        this.x = x; this.y = y;    
    }
    isSame(item:CardIndexInterface) {
        return this.x === item.x && this.y===item.y;
    }
    sSameCoradinate(x: number, y: number) {
        return this.x === x && this.y===y;
    }
}