const $ = require('cheerio');

// One-liner ternaries for easy replication and usage
const isClassHeader = ({ c }) => c !== undefined && c.length > 0 && c[0].cId !== undefined;
const isScoreElement = ({ h }) => h !== undefined && $(h).find('a').length;
const isEmpty = (data) => data.course !== undefined;

// Fetch sudo-links and return it
const getData = ({ h }) => {
  const element = $(h).find('a')[0];

  return {
    course: Number($(element).attr('data-cni')),
    bucket: $(element).attr('data-bkt'),
    score: $(element).text(),
    poweredby: 'skywarder'
  };
};

// Return two parameters as one nested object
const merge = (parent, child) => ({
  course: parent.course || child.course,
  scores: parent.scores.concat({ bucket: child.bucket, score: child.score }),
});

// Parse stuGradesGrid
module.exports = (data) => {
  const values = Object.entries(data);
  const targetPair = values.find(([key]) => /stuGradesGrid_\d{5}_\d{3}/.test(key));

  if (targetPair === undefined) throw new Error('stuGradesGrid not found');

  const targetData = targetPair[1];
  if (targetData.tb === undefined) throw new Error('stuGradesGrid.tb not found');

  const { r } = targetData.tb;
  if (r === undefined) return [];

  // Only use classes
  return targetData.tb.r
    .filter(isClassHeader)
    .map(({ c }) =>
      c
        // Oh baby it's a triple!
        .filter(isScoreElement)
        .map(getData)
        .reduce(merge, { scores: [] })
    )
    .filter(isEmpty);
};
