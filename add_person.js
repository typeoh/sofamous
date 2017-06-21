const arg = process.argv.slice(2);
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
  },
  useNullAsDefault: true
});
function insertNewFamous(arg) {
  knex.insert([
    {'first_name': arg[0],
    'last_name': arg[1],
    'birthdate': arg[2]}]).into('famous_people').asCallback(function(err, rows) {
      if (err) {
        return console.error(err);
    } else {
      knex.destroy();
    }
  })
};
  insertNewFamous(arg);

