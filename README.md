# ADOMAIL

> This project demonstrates a REST API with e-mail functionality using [AdonisJS](https://adonisjs.com/). It uses AdonisJS **v4.1**.

## Setup

Run the command below to install dependencies

```bash
$ npm install
```

### Environment variables

Duplicate `.env.example` and rename it `.env`

### Migrations

To setup your database. Create a `adomail.sqlite` file in the database folder.

To setup e-mail functionality you can create a [Mailtrap](https://mailtrap.io/) account. From the Mailtrap settings you can copy the port, username and password.

Enter the following in `.env` file

```
HOST=127.0.0.1
PORT=99
NODE_ENV=development
APP_NAME=Adomail
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=
DB_CONNECTION=sqlite
DB_DATABASE=adomail
HASH_DRIVER=bcrypt
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
```

Run this command to generate a key for the app.

```bash
$ adonis key:generate
```

Run the following command to run migration.

```bash
$ adonis migration:run
```

Seed the database:

```bash
$ adonis seed
```

Finally, start the application:

```bash
$ adonis serve --dev
```
