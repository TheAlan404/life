module.exports = class Space {
  /**
   * Constructs the space.
   */
  constructor() {
    this.stars = this.planets = Infinity;
    this.mainPlanet = 'Earth';
    this.mainSolarSystem = {};
    this.large = true;
    this.hasAir = false;
    this.exploreState = {
      timesExplored: 0,
      get explored() {
        return this.timesExplored > 0;
      }
    };
    this.destroyed = false;
  }

  /**
   * Explores this space instance.
   * @returns {boolean}
   */
  explore() {
    isDestroyed();
    return (Math.random() + .5) >= 1 ? (this.exploreState.timesExplored++, true) : false;
  }

  /**
   * Destroys this space instancs. (You can't call any methods
   * of the space instance when its dead)
   * @returns {boolean}
   */
  destroy() {
    if (this.destroyed === true) throw new Error('This space has already been destroyed');
    return this.destroyed = true;
  }

  get isDestroyed() {
    if (this.destroyed === true) throw new Error('This space instance is destroyed');
  }
};
