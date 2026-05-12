/**
 * Minimum Initial Energy to Finish Tasks
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumEffort = function (tasks) {
  tasks.sort((taskOne, taskTwo) => {
    const diffOne = taskOne[1] - taskOne[0];
    const diffTwo = taskTwo[1] - taskTwo[0];
    return diffTwo - diffOne;
  });

  let minimumTotalEnergyRequired = 0;
  let currentEnergyBalance = 0;

  for (const individualTask of tasks) {
    const taskActualCost = individualTask[0];
    const taskMinimumRequirement = individualTask[1];

    if (currentEnergyBalance < taskMinimumRequirement) {
      const energyDeficiency = taskMinimumRequirement - currentEnergyBalance;
      minimumTotalEnergyRequired += energyDeficiency;
      currentEnergyBalance += energyDeficiency;
    }
    currentEnergyBalance -= taskActualCost;
  }

  return minimumTotalEnergyRequired;
};
