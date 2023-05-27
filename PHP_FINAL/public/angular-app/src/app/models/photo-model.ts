export class Photo {
    #title!:String;
    #url!:String
    get title() {return this.#title;}
    get url() {return this.#url;}
    
    set title(title) {this.#title= title;}
    set url(url) {this.#url= url;}
    
    constructor() {
    }
  }