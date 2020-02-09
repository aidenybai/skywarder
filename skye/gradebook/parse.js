// Helper functions utilizing cheerios scraping API
const cheerio = require('cheerio');

// Filter string through expression, short-circuit and check number
const extractNumber = (regexp, text) => {
  const result = regexp.exec(text);
  const n = result && Number(result[1]);
  return n === 0 ? 0 : n || null;
};

// Utilize extractNumber helper func to exec and double check number
const extractPoints = (pointsText) => {
  const earned = extractNumber(/([\d*.]+)\D+[\d*.]+/, pointsText);
  const total = extractNumber(/[\d*.]+\D+([\d*.]+)/, pointsText);
  return { earned, total };
};

// For given block row element, get the bare displayed data
const parseHeader = ($) => {
  // h2.gb_heading>span root of tree
  // Link contains course and instructor
  const course = $('h2.gb_heading>span>a')
    .first()
    .text();
  const instructor = $('h2.gb_heading>span>a')
    .last()
    .text();

  // Period in a seperate span
  const periodText = $('h2.gb_heading>span>span').text(); 
  const period = extractNumber(/\(\D+(\d+)\)/, periodText);

  return { course, instructor, period };
};

// Clean up HTML table
const parseSummary = ($) => {
  const resultRow = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr').first();

  // Get first item of row (grade after rounding)
  const gradeText = resultRow
    .find('td')
    .first()
    .text();
  const grade = extractNumber(/(\d+)/, gradeText);

  // Get last item of row (absolute grade)
  const scoreText = resultRow
    .find('td')
    .last()
    .text();
  const score = extractNumber(/(\d+\.\d+)/, scoreText);

  // Calculate grade adjustment by using slice
  const gradeAdjustmentText = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr')
    .slice(1, 2)
    .find('td')
    .last()
    .text();
  const gradeAdjustment = extractNumber(/(\d+\.\d+)/, gradeAdjustmentText);

  // Parses the bucket's alias, begin date, and end date
  const litText = $('table[id*="grid_stuTermSummaryGrid"]>thead>tr>th')
    .first()
    .text();
  const litResults = /(\w+)\D+\((\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})\)/.exec(litText);
  const name = litResults && litResults[1];
  const begin = litResults && litResults[2];
  const end = litResults && litResults[3];
  const lit = { name, begin, end };

  return {
    grade,
    score,
    lit,
    gradeAdjustment,
  };
};

// Parses the quantitive data
const parseBreakdown = ($) => {
  const breakdown = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr.even');

  if (breakdown.first().text() === '') return null; // no header

  const extractData = (i, tr) => {
    // Get score of class category
    const scoreText = $(tr)
      .find('td')
      .last()
      .text();
    const score = extractNumber(/(\d+\.\d+)/, scoreText);

    const rest = $(tr)
      .find('td')
      .first();

    // Get lit alias
    const litText = rest
      .find('div')
      .first()
      .text();
    const lit = /(\w*)/.exec(litText)[1];

    
    // Get score after rounding 
    const gradeText = rest
      .find('div')
      .slice(1, 2)
      .text();
    const grade = extractNumber(/(\d+)/, gradeText);

    // Gets percentage that affects overall grade
    const weightText = rest
      .find('div')
      .last()
      .text();
    const weight = extractNumber(/\((\d+)%\D+\d\D+\)/, weightText);

    return {
      lit,
      grade,
      score,
      weight,
    };
  };

  // Dump all data into a synthetic array
  return breakdown
    .filter((i) => i !== 0) // Skip the header
    .map(extractData)
    .toArray();
};

// Parsing function
const parseGradebook = ($) => {
  const parseSemesterCategory = (parentTr) => {
    // Extract Category by reading title and removing excess spaces (Thank Skyward for a garbage way of dealing with whitespace)
    const category = $(parentTr)
      .text()
      .trim();

    // Map breakdown to process junk
    const breakdown = [
      $(parentTr).next(),
      $(parentTr)
        .next()
        .next(),
    ].map((tr) => {
      // Get table element and remove sides
      const label = $(tr)
        .find('td')
        .slice(1, 2);

      // Get lit by getting first item of the span inside
      const lit = label
        .find('span')
        .first()
        .text();

      // Get hover-over tooltip for each span
      const datesText = label
        .find('span')
        .first()
        .attr('tooltip');

      // Regex and process out dates
      const datesResults = /(\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})/.exec(datesText);
      const begin = datesResults ? datesResults[1] : '';
      const end = datesResults ? datesResults[2] : '';
      const dates = { begin, end };

      // Process and regex out weight
      const weightText = label
        .find('span')
        .last()
        .text();
      const weight = extractNumber(/\(\D+(\d+\.\d+)%\)/, weightText);

      // Process and regex out letter grade 
      const gradeText = $(tr)
        .find('td')
        .slice(2, 3)
        .text();
      const grade = extractNumber(/(\d+)/, gradeText);

      // Process and regex out raw score 
      const scoreText = $(tr)
        .find('td')
        .slice(3, 4)
        .text();
      const score = extractNumber(/(\d+.\d+)/, scoreText);

      // Process and regex out points
      const pointsText = $(tr)
        .find('td')
        .slice(4, 5)
        .text();
      const points = extractPoints(pointsText);

      // Return parsed data
      return {
        lit,
        weight,
        dates,
        grade,
        score,
        points,
      };
    });

    // Do I hear nested returns
    return {
      category,
      breakdown,
      assignments: [],
    };
  };

  // Utilizing helper functions, finds elements
  const extractData = (_, tr) => {
    // Get table data
    if ($(tr).find('td').length <= 1) return null;

    const isCategory = $(tr).hasClass('sf_Section cat');
    if (
      isCategory &&
      $(tr)
        .prev()
        .hasClass('sf_Section cat')
            )
      return null;
    if (
      isCategory &&
      $(tr)
        .next()
        .hasClass('sf_Section cat')
    )
      return parseSemesterCategory(tr);

    const gradeText = $(tr)
      .find('td')
      .slice(2, 3)
      .text();
    const grade = extractNumber(/(\d+)/, gradeText);

    const scoreText = $(tr)
      .find('td')
      .slice(3, 4)
      .text();
    const score = extractNumber(/(\d+.\d+)/, scoreText);

    const pointsText = $(tr)
      .find('td')
      .slice(4, 5)
      .text();
    const points = extractPoints(pointsText);

    if (isCategory) {
      const label = $(tr)
        .find('td')
        .slice(1, 2);

      const category = label
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      const weightText = label.find('span').text();
      const weight = extractNumber(/\D+([\d*.]+)%/, weightText);
      const adjustedWeight = extractNumber(/\D+[\d*.]+\D+(\d+\.\d+)%/, weightText);

      return {
        category,
        weight,
        adjustedWeight,
        grade,
        score,
        points,
        assignments: [],
      };
    }

    const date = $(tr)
      .find('td')
      .first()
      .text();
    const title = $(tr)
      .find('td')
      .slice(1, 2)
      .text();

    // Find table elements and extract edge-case statuses
    const missingText = $(tr)
      .find('td')
      .slice(5, 6)
      .text();
    const noCountText = $(tr)
      .find('td')
      .slice(6, 7)
      .text();
    const absentText = $(tr)
      .find('td')
      .slice(7, 8)
      .text();
    // Shove back asasignment attendance data
    const meta = [
      { type: 'missing', note: missingText },
      { type: 'noCount', note: noCountText },
      { type: 'absent', note: absentText },
    ].filter(({ note }) => !note.match(/^\s+$/)); // Callback for filter

    // Return it all back
    return {
      title,
      grade,
      score,
      points,
      date,
      meta,
    };
  };

  // Nest return objects (helper)
  const nest = (gradebook, data) => {
    if (data === null) return gradebook;
    if (data.category) return gradebook.concat(data);

    const previousCategory = gradebook.slice(-1)[0];
    const assignments = previousCategory.assignments.concat(data);

    return [...gradebook.slice(0, -1), Object.assign(previousCategory, { assignments })];
  };

  return $('table[id*="grid_stuAssignmentSummaryGrid"]>tbody>tr')
    .map(extractData)
    .toArray()
    .reduce(nest, []);
};

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  // Sync grab all necessary data using helper functions based on data
  const { course, instructor, period } = parseHeader($);
  const { lit, grade, score, gradeAdjustment } = parseSummary($);
  const breakdown = parseBreakdown($);
  const gradebook = parseGradebook($);

  return {
    course,
    instructor,
    lit,
    period,
    grade,
    gradeAdjustment,
    score,
    breakdown,
    gradebook,
    poweredby: 'skywarder'
  };
};
