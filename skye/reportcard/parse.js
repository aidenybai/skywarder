const cheerio = require('cheerio');

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const script = $('script[data-rel="sff"]').html();

  // Use cheerio to regex out course, scores, and buckets
  const results = /\$\.extend\(\(sff\.getValue\('sf_gridObjects'\) \|\| {}\), ([\s\S]*)\)\);/g.exec(
    script
  );

  return results === null ? {} : eval(`0 || ${results[1]}`); 
};
