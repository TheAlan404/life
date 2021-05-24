const EventEmitter = require('events').EventEmitter;

/**
* A Person's Name
* @typedef {Object} PersonName
* @property {String} first
* @property {String} [middle]
* @property {String} last
*/

/**
* Data for creating the person
* @typedef {object} PersonOptions
* @property {(PersonName|Object|String)} name 
* @property {Date} birthday 
* @property {Gender} gender
* @property {Sex} sex - the person's AGAB, defaults to property gender
*/

/**
* @typedef {("male"|"female"|"nonbinary")} Gender
*/

// TODO: include intersex in Sex

/**
* @typedef {("male"|"female")} Sex
*/


module.exports = class Person extends EventEmitter {
    /**
     * Creates a new person
     * @param {PersonOptions}
     * @example new Person({
                    name: {
                        first: 'First',
                        middle: 'Middle',
                        last: 'Last'
                    }, 
                    birthday: new Date(2005,1,1),
                });
     * @example new Person({ name: "Mike Morasky" });
     */
    constructor(data = {}) {
        super();
        
        this.name = Person.parseName(data.name);
        this.birthday = data.birthday;
        this.gender = data.gender || 0.5 > Math.random() ? "female" : "male" ;
        this.sex = data.sex || 0.05 < Math.random() ? this.gender : Person.reverseGender(this.gender);

        if(this.sex == "nonbinary") throw new Error("Non-binary is a gender; not a sex, please specify the person's sex");
        
        this.currentaction = "Nothing";
        this.boredom = 0;
        this.horniness = 0;
        this.masturbating = false;
        this.canmasturbate = true;
        if (isFemale(this.sex)) {
            this.pregnancy = {
                timeLeft: 0,
                pregnant: false,
            };
        }



        setInterval(() => this._loop, 60000);
    }
    
    /**
    * The person's age
    * @property {number} age
    */
    get age() {
        return new Date(Date.now() - this.birthday).getFullYear();
    }
    
    /**
    * Checks if the person is transgender
    * @property {boolean} isTransgender
    */
    get isTransgender() {
        return this.sex !== this.gender;
    }

    _loop() {

        if (this.currentaction === "Nothing") this.boredom++;            // if we're not doing anything, increase bored level
        if (this.boredom === 2) this.emit('bored', this.boredom);        // if we're pretty bored        emit bored event
        if ((this.boredom % 10) === 0) this.horniness++;                // if we're very bored,         increase horny level
        if (this.horniness === 1) this.emit('horny', this.horniness);    // if horny level is 1,         emit horny event
        if (this.horniness === 5) this.masturbate();                     // if we're pretty horny,       masturbate.

    }

    masturbate() {
        if (this.masturbating) return;
        if (!this.canmasturbate) return;
        this.emit('masturbating');
        setTimeout(() => {

            if (isFemale(this.gender)) {
                this.orgasm();
            } else {
                this.cum();
            }
            this.horniness = 0;
            this.boredom -= 3;
        }, 30000);
    }
    
    /**
    * Makes the person have sex with another person
    * @param {Person} otherPerson
    */
    haveSexWith(otherPerson) {
        // TODO: implement genitilia checks or this isnt gonna respect transgender people and such ._. -den
    }
    
    
    
    
    /**
    * Parses PersonName
    * @param {(PersonName|string|object)}
    */
    static parseName(name) {
        if(!name) return Person.generateName();
        if(typeof name == "object") {
            if(!name.first && !name.last) return Person.generateName();
            return name;
        }
        if(typeof name == "string") return {
          first: name.split(" ")[0],
          middle: name.split(" ").length >= 3 ? name.split(" ").shift().pop().join(" ") : null,
          last: name.split(" ")[name.split(" ").length - 1],
        };
    }
    
    /**
    * Reverses the given gender / genderbends
    * @param {Gender} gender
    * @returns {Gender} reversed gender
    */
    static reverseGender(gender) {
        if(gender == "male") return "female";
        if(gender == "female") return "male";
        return "nonbinary";
    }
    
    /**
    * Generates 
    */
    static generateName() {
        // TODO
    }
    
};


function isFemale(gender) {
    if (gender === "fem" || gender === "female" || gender === "feminine" || gender === "f" || gender === "girl") return true;
    return false;
}

function isMale(gender) {
    if (gender === "masc" || gender === "male" || gender === "masculine" || gender === "m" || gender === "man") return true;
    return false;
}

function isIntersex(gender) { // does this count as non-binary too? -den
    return !isMale(gender) && !isFemale(gender);
}
