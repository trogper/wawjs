/* 

Paged request for sonar urls
sonar supports pageSize and pageIndex as params in URL,
this can get all results (sequential, not to kill sonar)

IN:     uri
OUT:    concatenated paged result

node sonar/_sonar_rules/cli.js \
    'https://gazelle.ihe.net/sonar/api/rules/search?languages=js&' \
    | jsontool -a name
*/

const [, , URL] = process.argv;

const { doWhilst } = require("async");
const request = require("request")
  .defaults({ json: true });


let pageIndex = 0;
const results = [];

doWhilst(
  function _do(done) {
    request(`${URL}&pageIndex=${pageIndex + 1}`,
      (err, { statusCode }, result) => {
        if (err || statusCode !== 200)
          return done(err || new Error(statusCode));

        results.push(...result.rules);
        pageIndex++;
        done(null, result);
      }
    );
  },
  function _while({ p, ps, total }) {
    // has more records, index * pageSize
    return p * ps < total;
  },
  function _done(err) {
    if (err) throw err;
    console.log(JSON.stringify(results, null, 2));
  }
);
