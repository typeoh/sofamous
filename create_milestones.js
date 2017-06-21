exports.up = function(knex) {
  return knex.schema.table("milestones", (table) => {
  table.foreign('famous_person_id').references('famous_people.id')
  });
};
exports.down = function(knex) {
  return knex.schema.table("milestones", (table) => {
  table.dropForeign('famous_person_id')
  table.dropColumn('famous_person_id')
  });
};