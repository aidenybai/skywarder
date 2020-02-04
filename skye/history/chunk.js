module.exports = chunkFunc => (arr, yearData) => [
  // Spread dates parameter data
  ...arr,
  ...yearData.reduce((years, row) => (chunkFunc(row)
    ? [...years, [row]]
    // Needs slicing else it kills itself
    : [...years.slice(0, -1), [...years.slice(-1)[0], row]]), []),
];