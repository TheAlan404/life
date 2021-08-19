const SexualOrientations = [
	"homosexual",
	"gay",
	"lesbian",
	"bisexual",
	"pansexual",
	"asexual",
	"heterosexual",
	"straight",
];

const RomanticOrientations = [
	"heteroromantic",
	"homoromantic",
	"biromantic",
	"panromantic",
	"aromantic",
];

const SexualToRomantic = (sexual) => {
	if(sexual === "straight") return "heteroromantic";
	if(sexual === "gay" || sexual === "lesbian") return "homoromantic";
	if(sexual.has("sexual")) return sexual.replace("sexual", "romantic");
	throw new Error(`Cannot convert sexual orientation '${sexual}' to romantic orientation`);
};

const PickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

class Orientation {
	/**
	* Represents an orientation: romantic and sexual
	* TODO: what else is an "orientation"?
	* @param {Orientation} data
	*/
	constructor(data = {}){
		const { sexual, romantic } = data;
		
		this.sexual = sexual || PickRandom(SexualOrientations);
		this.romantic = romantic;
		if(!this.romantic) {
			let chance = 0.3;
			if(this.asexual) chance += 0.3;
			// wtf did i just type
			this.romantic = (
				(Math.random() < chance) ? "aromantic" : (
					Math.random() < 0.2 ? PickRandom(RomanticOrientations) : SexualToRomantic(this.sexual)
				)
			);
		};
	};
	
	/**
	* Returns true if asexual
	* @return {boolean}
	*/
	get asexual(){
		return this.sexual.toLowerCase() === "asexual";
	};
};

module.exports = {
	Orientation,
	SexualOrientations,
	RomanticOrientations,
	SexualToRomantic,
};