/**
 * Destroying Asteroids
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var asteroidsDestroyed = function (mass, asteroids) {
  asteroids.sort((firstElement, secondElement) => firstElement - secondElement);

  let currentPlanetPower = BigInt(mass);
  const numberOfAsteroids = asteroids.length;

  for (
    let asteroidIndex = 0;
    asteroidIndex < numberOfAsteroids;
    ++asteroidIndex
  ) {
    const currentRockMass = asteroids[asteroidIndex];
    if (currentPlanetPower < BigInt(currentRockMass)) {
      return false;
    }
    currentPlanetPower += BigInt(currentRockMass);
  }

  return true;
};
