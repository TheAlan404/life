// Life.js

const PersonCollection = require("./PersonCollection.js");

module.exports = {
  Person: require("./Person.js"),
  PersonCollection,
  Persons: PersonCollection.generate(),
  Space: require("./Space.js"),
  World: require("./World.js"),
};
