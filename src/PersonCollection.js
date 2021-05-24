// PersonCollection.js
const Person = require("./Person");
const generatorData = require("./persondb.json");

class PersonCollection {
	/**
	* Manages persons.
	* @constructor
	* @param {object} data
	*/
	constructor(data = {}){
		this.collection = data.collection || new Map();
	};
	/**
	* Gets a person from the collection
	* @param {string} id
	* @returns {null|Person}
	*/
	get(id) {
		if(!this.collection.has(id)) return null;
		let value = this.collection.get(id);
		return (value instanceof Person ? value : new Person(value));
	};
	/**
	* Puts a person to the collection.
	* @param {Person} person
	* @returns {string} id of the person saved as
	*/
	put(person){
		let id = person.name.first;
		let _i = 0;
		while(this.collection.has(id)) {
			id = person.name.first + _i;
			_i++;
		};
		this.collection.set(id, person);
		return id;
	};
	/**
	* Generates a collection from the defaults.
	* @returns {PersonCollection}
	*/
	static generate(data){
		let map = new Map(Object.entries(data || generatorData));
		map.forEach((value, id) => {
			let person = new Person(value);
			for(let key in value) {
				if(!person[key]) person[key] = value[key];
			};
			map.set(id, person);
		});
		return new PersonCollection({
			collection: map,
		});
	};
};


module.exports = PersonCollection;