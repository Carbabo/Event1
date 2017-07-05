export class Message {
 
  public id: number;
  public title: string;
  public content: string;
  public messagets: Date;
  public author: string;
  public office: number;
  public itinerary: number;
  public bcp: string;
  public priority: number;

  public constructor(data: any = {}) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.content = data.content || '';
    this.messagets = data.messagets || Date.now();
    this.author = data.author || 0;
    this.office = data.office || 0;
    this.itinerary = data.itinerary || 0;
    this.bcp = data.bcp || '';
    this.priority = data.priority || '';
  }
  
}
