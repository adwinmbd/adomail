"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");

class UserController {
  //show all users
  async show() {
    try {
      const users = await User.all();

      if (users) {
        return users;
      }
    } catch (err) {
      console.log(err);
      return response.status(err.status).send(err);
    }
  }
  // creating and saving a new user (sign-up)
  async store({ request, response }) {
    try {
      // getting data passed within the request
      const data = request.only(["username", "email", "password"]);

      // looking for user in database
      const userExists = await User.findBy("email", data.email);

      // if user exists don't save
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: "User already registered" } });
      }

      // if user doesn't exist, proceeds with saving him in DB
      const user = await User.create(data);

      return user;
    } catch (err) {
      return response.status(err.status).send(err);
    }
  }
  async update({ request, response, params }) {
    const id = params.id;
    const { username, email, password } = request.only([
      "username",
      "email",
      "password"
    ]);

    // looking for user in DB
    const user = await User.findBy("id", id);

    if (user) {
      // checking if old password informed is correct
      /*const passwordCheck = await Hash.verify(password, user.password);

      if (!passwordCheck) {
        return response
          .status(400)
          .send({ message: { error: "Incorrect password provided" } });
      }*/

      // updating user data
      user.username = username;
      user.email = email;
      user.password = password;

      // persisting new data (saving)
      await user.save();
      return response.json({ message: "user updated!" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const findUser = await User.find(params.id);

      if (findUser) {
        const deleteUser = await findUser.delete();
        return response.json({ message: "User deleted!" });
      }
      return response.json({ message: "User not found!" });
    } catch (error) {
      console.log(error);
      return response.json({ message: "Server unable to delete user!" });
    }
  }
}

module.exports = UserController;
