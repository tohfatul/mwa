export class User {
    // #_id!: String;
    #fullname!: String;
    #email!: String;
    #password!:String;
    
    // get _id() {return this.#_id;};
    get fullname() {return this.#fullname;}
    get email() {return this.#email;}
    get password() {return this.#password;}
    
    // set _id(_id) {this.#_id= _id;}
    set fullname(fullname) {this.#fullname= fullname;}
    set email(email) {this.#email= email;}
    set password(password) {this.#password= password;}
    constructor() {
    }
  }