export class Itinerary {

    public id: number;
    public destinationfrom: string;
    public destinationto: string;

    public constructor( data: any = {}) {
        this.id = data.id || -1;
        this.destinationfrom = data.destinationfrom || '';
        this.destinationto = data.destinationto || '';
    }

}
