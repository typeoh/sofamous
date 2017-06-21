const arg = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require('knex')({
   client: 'pg',
   connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


function printItOut(err, result) {
    console.log("Found " + result.length + ' person(s) by the name ' + arg); //output: 1
    for (var i = 0; i < result.length; i++) {
    console.log('- ' + i + ' ; ' + result[i].first_name + ' ' + result[i].last_name + ',' + ' born ' + result[i].birthdate.toISOString().slice(0,10)) 
  }
};

function runQuery(arg, callback) {
  knex('famous_people')
    .where('first_name', arg)
    .orWhere('last_name', arg)
    .asCallback(callback);
}
runQuery(arg, printItOut);
knex.destroy();
