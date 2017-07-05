export class Office {

    public id: number;
    public officeid: number;
    public officename: string;

    public constructor( data: any = {}) {
        this.id = data.id || 0;
        this.officeid = data.officeid || 0;
        this.officename = data.officename || '';
    }

}
