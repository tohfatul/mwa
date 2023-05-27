import { Photo } from "./photo-model";
import { Location } from "./location-model";
export class Travel {
    #_id!: String;
    #location!: Location
    #country!: String;
    // #photos!: [{
    //     "title": String,
    //     "url": String
    // }];
    #photos!: Photo[];
    get _id() {return this.#_id;};
    get location() {return this.#location;}
    get country() {return this.#country;}
    get photos() {return this.#photos;}
    
    set _id(_id) {this.#_id= _id;}
    set location(location) {this.#location= location;}
    set country(country) {this.#country= country;}
    set photos(photos) {this.#photos= photos;}
    constructor() {
    }
  }