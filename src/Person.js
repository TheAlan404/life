const EventEmitter = require('events');

/**
 * A Person's Name
 * @typedef {Object} PersonName
 * @prop {string} first
 * @prop {string} [middle]
 * @prop {string} last
 */

/**
 * Data for creating the person
 * @typedef {Object} PersonOptions
 * @prop {PersonName | Object | string} name 
 * @prop {Date} birthday 
 * @prop {Gender} gender
 * @prop {Sex} sex The person's AGAB, defaults to property gender
 */

/**
 * @typedef {'male' | 'female' | 'nonbinary'} Gender
 */

// TODO: Include intersex in Sex

/**
 * @typedef {'male' | 'female'} Sex
 */

class Person extends EventEmitter {
	/**
	* Creates a new person
	* @param {PersonOptions}
	* @example
	* new Person({
	*   name: {
	*     first: 'First',
	*     middle: 'Middle',
	*     last: 'Last'
	*   }, 
	*   birthday: new Date(2005, 1, 1)
	* });
	* @example
	* new Person({ name: 'Mike Morasky' });
	*/
	constructor(data = {}) {
		super();

		this.name = Person.parseName(data.name);
		this.birthday = data.birthday;
		this.gender = data.gender || (0.5 > Math.random() ? 'female' : 'male');
		// Note: if you use `sex` instead of `gender` fuck you
		this.sex = data.sex || (0.5 < Math.random() ? this.gender : reverseGender(this.gender));

		if(!isFemale(this.sex) && !isMale(this.sex) && !isIntersex(this.sex))
			throw new Error("Non-binary is a gender; not a sex, please specify the person's sex");

		this.currentAction = 'Nothing';
		this.boredom = 0;
		this.horniness = 0;
		this.masturbating = false;
		this.canMasturbate = true;
		if (isFemale(this.sex)) {
			this.canBePregnant = data.canBePregnant
			this.pregnancy = {
				timeLeft: 0,
				pregnant: false
			};
		}

		this._loopInterval = setInterval(this._loop, 60000);
	}

	/**
	* The person's age
	* @type {number}
	*/
	get age() {
		return new Date(Date.now() - this.birthday).getFullYear();
	}

	/**
	* Whether the person is transgender or not
	* @type {boolean}
	*/
	get isTransgender() {
		return this.sex !== this.gender;
	}

	/**
	* @return {void}
	*/
	_loop() {
		if (this.currentAction === 'Nothing') this.boredom++; // If we're not doing anything, increase boredom level
		if (this.boredom === 2) this.emit('bored', this.boredom); // If we're pretty bored, emit bored event
		
		
		if ((this.boredom % 10) === 0) this.horniness++; // If we're very bored, increase horniness level
		if (this.horniness === 1) this.emit('horny', this.horniness); // If horny level is 1, emit horny event
		if (this.horniness === 5) this.masturbate(); // If we're pretty horny, masturbate.
	}

	/**
	* @return {void}
	*/
	masturbate() {
		if (this.masturbating || !this.canMasturbate) return;

		this.emit("masturbating");

		setTimeout(() => {
			if (isFemale(this.sex)) this.orgasm();
			else this.cum();

			this.horniness = 0;
			this.boredom -= 3;
			this.emit("masturbated");
		}, 30000);
	}

	/**
	* Makes the person have sex with another person
	* @param {Person} otherPerson
	* @returns {void}
	*/
	haveSexWith(otherPerson) {
		// TODO(Den): Implement
	}

	/**
	* Parses PersonName
	* @param {PersonName | string | Object}
	* @returns {string | Object}
	*/
	static parseName(name) {
		if(!name) return Person.generateName();
		if(typeof name === "object") {
			if (!name.first && !name.last) return Person.generateName();
			return name;
		};
		if(typeof name === "string") {
			const parts = name.split(" ");
			return {
				first: parts[0],
				middle: parts.length >= 3 ? parts.slice(1, -1).join(" ") : null,
				last: parts[parts.length - 1],
			};
		};
	};
	
	/**
	* Generates a name
	* @returns {void}
	*/
	static generateName() {
		// TODO
	};
};

/**
* Reverses the given gender / genderbends
* @param {Gender} gender
* @returns {Gender} Reversed gender
*/
function reverseGender(gender) {
	if(isFemale(gender)) return "male";
	if(isMale(gender)) return "female";
	return "nonbinary";
};

/**
 * @param {string} gender
 * @returns {boolean}
 */
function isFemale(gender) {
	switch (gender) {
		case "fem":
		case "female":
		case "feminine":
		case "f":
		case "girl":
		case "woman":
			return true;
		default:
			return false;
	};
};

/**
 * @param {string} gender
 * @returns {boolean}
 */
function isMale(gender) {
	switch (gender) {
		case "masc":
		case "male":
		case "masculine":
		case "m":
		case "man":
		case "men":
		case "boy":
			return true;
		default:
			return false;
	};
};

/**
 * @param {string} sex
 * @returns {boolean}
 */
function isIntersex(sex) {
	switch (sex) {
		case "intersex":
		case "both":
		case "all":
		case "multiple":
		case "inter":
			return true;
		default:
			return false;
	};
};


module.exports = Person;