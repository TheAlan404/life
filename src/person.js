const EventEmitter = require('events').EventEmitter;
module.exports = class Person extends EventEmitter {
    /**
     * Creates a new person
     * @param {Object} name 
     * @param {Number} age 
     * @param {Date} birthday 
     * @param {String} gender 
     * @example new Person({first: 'First', middle: 'Middle', last: 'Last'}, 16, new Date(2005,1,1))
     */
    constructor(name, age, birthday, gender) {
        super();
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
};


function isFemale(gender) {
    if (gender === "fem" || gender === "female" || gender === "feminine" || gender === "f" || gender === "girl") return true;
    return false;
}

function isMale(gender) {
    if (gender === "masc" || gender === "male" || gender === "masculine" || gender === "m" || gender === "man") return true;
    return false;
}