export class Score {
    id?: number;
    points: number;
    username: string;
    mode: string;
    constructor(id: number | null | undefined, points: number, username: string, mode: string) {
        if (id) {
            this.id=id;
        }
        this.points=points;
        this.username=username;
        this.mode=mode;
    }
}