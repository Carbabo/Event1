export class Attachment {
 
  public id: number;
  public idmessage: number;
  public filename: string;

  public constructor(data: any = {}) {
    this.id = data.id || 0;
    this.idmessage = data.idmessage || 0;
    this.filename = data.filename || '';
  }
  
}
