"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.get("users", "UserController.show");

Route.post("users", "UserController.store");
Route.put("users/:id", "UserController.update");
Route.delete("users/:id", "UserController.destroy");
Route.post("users/password/email", "PasswordController.sendEmailToken");
Route.get(
  "users/password/email/:token/:email",
  "PasswordController.showUserToken"
);
Route.put("users/password/email/:token/:email", "PasswordController.update");
/*Route.group(() => {
  // updating username and password
  Route.put("users/:id", "UserController.update");
}).middleware(["auth"]);*/
