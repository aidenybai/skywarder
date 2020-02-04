const $ = require('cheerio');
const chunk = require('./chunk');

// Setup object template for courses & other metadata
const parseHeader = ({ c }) => {
  const headerText = $(c[0].h).text();
  const headerResults = /(\d+)\D+(\d+)\D+(\d+)/.exec(headerText);

  // Short circuiting :O
  const begin = headerResults && headerResults[1];
  const end = headerResults && headerResults[2]; 
  const dates = { begin, end };

  // Ternary out grade
  const grade = headerResults ? Number(headerResults[3]) : null;

  return { dates, grade, courses: [], poweredby: 'skywarder' };
};

// Get bucket aliases
const parseLits = ({ c }) =>
  c
    .slice(2)
    .map(({ h }) => $(h).text())
    .map((lit) => ({ lit })); // Restructure aliases

// Parse through blocks of data for courses and scores
const parseCourses = ({ c }) => {
  const course = $(c[0].h).text();
  const scores = c
    .slice(2)
    .map(({ h }) =>
      $(h)
        .text()
        .trim() // Weird spacing so kill it
    )
    .map((text) => ({ grade: Number(text) || text || null })); // Map to an object (w/ short circuiting)
  return { course, scores };
};

// Fix alignment of object elements
const merge = (obj, row) => {
  if (row.courses) return row;
  if (row.scores) return Object.assign(obj, { courses: obj.courses.concat(row) }); // append score

  const courses = obj.courses.map((course) =>
    Object.assign(course, {
      scores: course.scores
        .map(({ grade }, i) => Object.assign({ grade }, row[i]))
        .filter(({ grade }) => !!grade),
    })
  );

  return Object.assign(obj, { courses });
};

module.exports = (data) => {
  // Hoisted values for more abstract code
  const values = Object.entries(data);
  const targetPairs = values.filter(([key]) => /gradeGrid_\d{5}_\d{3}_\d{4}/.test(key));

  // Boolean helper function to regex out header result
  const isHeader = (row) =>
    /(\d+)\D+(\d+)\D+(\d+)/.test(
      $(row.c[0].h)
        .find('div')
        .first()
        .text()
    );

  // Parse, recombine, and return data for organization/alignment
  return targetPairs
    .map((pair) => pair[1])
    .map(({ tb: { r } }) => r)
    .reduce(chunk(isHeader), []) // chunking
    .map(([header, lits, ...courses]) =>
      [parseHeader(header), ...courses.map(parseCourses), parseLits(lits)].reduce(merge) // Restructure into array
    );
};
