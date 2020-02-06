"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = [
      {
        username: "bobo",
        email: "bobo@bobo.com",
        password: "bobo"
      },
      {
        username: "lina",
        email: "lina@lina.com",
        password: "bobo"
      },
      {
        username: "dana",
        email: "dana@dana.com",
        password: "dana"
      },
      {
        username: "femi",
        email: "femi@femi.com",
        password: "femi"
      }
    ];
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
