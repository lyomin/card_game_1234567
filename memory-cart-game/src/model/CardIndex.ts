export interface CardIndexInterface {
    x: number;
    y: number;
    isSame(item : CardIndexInterface) : boolean;
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
}