export class User {

    public id: number;
    public userid: string;
    public username: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public officeid: number;
    public office: string; // full name
    public localview: boolean = true;
    public admin: boolean = false;

    public avatarUrl: string;
    public creationDate: string;
    public preferredLang: string;

    public connected: boolean = false;

    public constructor( data: any = {}) {
        this.id = data.id || -1;
        this.userid = data.userid || '';
        this.username = data.username || '';
        this.password = data.password || '';
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.email = data.email || '';
        this.officeid = data.officeid || '';
        this.office = data.officename || 'Not available';
        this.avatarUrl = data.avatarUrl || '';
        this.creationDate = data.creation_date || Date.now();
        this.preferredLang = data.preferredLang || null;
        this.connected = data.connected || false;
        this.localview = data.localview; 
        this.admin = data.admin; 
    }

    public getName() {
        return this.firstname + ' ' + this.lastname;
    }
}
