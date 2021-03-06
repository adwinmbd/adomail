"use strict";

const User = use("App/Models/User"); // user model
const Mail = use("Mail"); // Adonis' mail

const moment = require("moment"); // moment (RUN NPM INSTALL MOMENT)
const crypto = require("crypto"); // crypto

class PasswordController {
  async sendEmailToken({ request, response }) {
    try {
      // account request password recovery
      const { email } = request.only(["email"]);

      // checking if email is registered
      const user = await User.findBy("email", email);

      if (user) {
        // generating token
        const token = await crypto.randomBytes(10).toString("hex");

        if (token) {
          // registering when token was created and saving token
          user.token_created_at = new Date();
          user.token = token;
          // saving user
          await user.save();

          await Mail.send("emails.recover", { user, token }, message => {
            message.from("support@hello.com").to(email);
          });

          return response.json({
            status: "success",
            message: "Password reset link sent to your e-mail."
          });
        }
        return response.status(400).json({
          status: "error",
          message: "Server unable to generate token"
        });
      }
      return response.status(400).json({
        status: "error",
        message: "user does not exist"
      });
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        status: "error",
        message: "Server unable to process request."
      });
    }
  }

  async showUserToken({ request, response, params }) {
    const tokenProvided = params.token; // retrieve token from URL
    const emailRequesting = params.email; // retrieve e-mail from URL

    try {
      // looking for user with the e-mail provided
      const user = await User.findBy("email", emailRequesting);

      if (user) {
        // checking if token is still the same
        const sameToken = tokenProvided === user.token;

        if (!sameToken) {
          return response.status(401).send({
            message: {
              error: "Old token provided or token already used"
            }
          });
        }

        // checking if token is still valid (48 hour period)
        const tokenExpired = moment()
          .subtract(2, "days")
          .isAfter(user.token_created_at);

        if (tokenExpired) {
          return response
            .status(401)
            .send({ message: { error: "Token expired" } });
        }
        // displaying user from provided URL
        return user;
      }
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        status: "error",
        message: "Server unable to process request."
      });
    }
  }
  async update({ request, response, params }) {
    const tokenProvided = params.token; // retrieve token from URL
    const emailRequesting = params.email; // retrieve e-mail from URL

    const { newPassword } = request.only(["newPassword"]);

    try {
      // looking for user with the e-mail provided
      const user = await User.findBy("email", emailRequesting);

      if (user) {
        // checking if token is still the same
        const sameToken = tokenProvided === user.token;

        if (!sameToken) {
          return response.status(401).send({
            message: {
              error: "Old token provided or token already used"
            }
          });
        }

        // checking if token is still valid (48 hour period)
        const tokenExpired = moment()
          .subtract(2, "days")
          .isAfter(user.token_created_at);

        if (tokenExpired) {
          return response
            .status(401)
            .send({ message: { error: "Token expired" } });
        }

        // saving new password
        user.password = newPassword;

        // deleting current token
        user.token = null;
        user.token_created_at = 0;

        // saving updated information
        await user.save();
        await Mail.send("emails.reset", { user }, message => {
          message.from("support@hello.com").to(emailRequesting);
        });

        return response.json({
          status: "success",
          message: "Password reset succesful."
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        status: "error",
        message: "Server unable to process request."
      });
    }
  }
}

module.exports = PasswordController;
