
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Nguyen', password: 'some_hash value1', department: 'Technology'},
        {username: 'William', password: 'some_hash value2', department: 'Music'},
        {username: 'DMike', password: 'some_hash value3', department: 'Technology'}
      ]);
    });
};
