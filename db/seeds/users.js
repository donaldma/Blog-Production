require('dotenv').config({silent: true})
const bcrypt = require("bcrypt");

exports.seed = function (knex, Promise) {
  function insertUser(email, password, name, avatar_url, about) {
    return knex('users').insert({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      avatar_url,
      about
    }).returning('id');
  }

  return knex('users').del()
    .then(function () {
      return Promise.all([
        insertUser(
          'gabriellagloria_@hotmail.com',
          process.env.PASSWORD,
          'Gabriella Gloria',
          'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/19030332_10158810180885015_8846965102926078985_n.jpg?oh=634fa93c00c1aa983896c5f7e820b8bd&oe=59F10855',
          '')
      ]);
    });
}