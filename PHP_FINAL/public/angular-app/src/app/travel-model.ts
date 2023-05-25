export class Travel {
    #_id!: String;
    #location!: {
        name: String,
        coordinates: [number]
    };
    #country!: String;
    #photos!: [{
        "title": String,
        "url": String
    }];
    
    get _id() {return this.#_id;};
    get location() {return {"name": this.#location.name, "coordinates": this.#location.coordinates};}
    get country() {return this.#country;}
    get photos() {return this.#photos;}
    
    set _id(_id) {this.#_id= _id;}
    set location(location) {this.#location= location;}
    set country(country) {this.#country= country;}
    set photos(photos) {this.#photos= photos;}
    constructor() {
    }
  }