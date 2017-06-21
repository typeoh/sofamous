const arg = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg'
});

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

knex.select().from('users')
// .where('id', '>', 20)
// .andWhere('id', '<', 200)
// .limit(10)
// .offset(x)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(rows);
  // knex.select().from('users')
  //   .whereIn('nickname', _.pluck(rows, 'name'))
  //   .asCallback(function(err, rows) {
  //     if (err) return console.error(err);
  //     console.log(rows);
  //   });
});

// knex.select().from('famous_people').where('first_name' = '${arg}')orWhere('last_name', '${arg}')