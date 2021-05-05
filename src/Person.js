const EventEmitter = require('events').EventEmitter;

/**
* A Person's Name
* @typedef {Object} PersonName
* @property {String} first
* @property {String} [middle]
* @property {String} last
*/

module.exports = class Person extends EventEmitter {
    /**
     * Creates a new person
     * @param {(PersonName|Object|String)} name 
     * @param {Number} age 
     * @param {Date} birthday 
     * @param {String} gender 
     * @example new Person({first: 'First', middle: 'Middle', last: 'Last'}, 16, new Date(2005,1,1))
     */
    constructor(name, age, birthday, gender) {
        super();
        if(typeof name == "string") name = {
          first: name.split(" ")[0],
          middle: name.split(" ").length >= 3 ? name.split(" ").shift().pop().join(" ") : null,
          last: name.split(" ")[name.split(" ").length - 1],
        };
        this.name = name;
        this.age = age;
        this.birthday = birthday;
        this.gender = gender;


        this.currentaction = "Nothing";
        this.boredom = 0;
        this.horniness = 0;
        this.masturbating = false;
        this.canmasturbate = true;
        if (isFemale(gender)) {
            this.pregnancy = {
                timeLeft: 0,
                pregnant: false,
            };
        }



        setInterval(() => this._loop, 60000);
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
