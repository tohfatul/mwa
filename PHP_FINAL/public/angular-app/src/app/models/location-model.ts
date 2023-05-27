export class Location {
    #name!:String;
    #coordinates!:Number [];
    
    get name() {return this.#name;}
    get coordinates() {return this.#coordinates;}
    
    set name(name) {this.#name= name;}
    set coordinates(coor) {this.#coordinates= coor;}
    
    constructor() {
    }
  }