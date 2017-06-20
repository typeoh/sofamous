const arg = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


function printItOut(result) {
    console.log("Found " + result.rowCount + ' person(s) by the name ' + arg); //output: 1
    for (var i = 0; i < result.rowCount; i++) {
    console.log('- ' + i + ' ; ' + result.rows[i].first_name + ' ' + result.rows[i].last_name + ',' + ' born ' + result.rows[i].birthdate.toISOString().slice(0,10)) 
  }
};

function runQuery(arg, callback) {
  client.query(`SELECT * FROM famous_people WHERE first_name = '${arg}' OR last_name = '${arg}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    callback(result);
    client.end();
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    runQuery(arg, printItOut);
  }
});
