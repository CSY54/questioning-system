# Questioning System

Developed by [CSY54](https://csy54.github.io/)

## Setup

1. Create a new table in MySQL from `init.sql` file.
```sh
mysql -u "username" -p < init.sql
```
2. Create a file name `.env` with the contents below.
**Important** Don't use the value provided below.
```text
# Listening on
PORT=3000

# For authenticating the session
SECRET=secret

# The username and password for admin user
ADMIN_USER=admin
ADMIN_PASS=admin

# The configuration for databases
DB_HOST=localhost
DB_USER=questions
DB_PASS=questions
DB_NAME=questions

# Whether log to file or not
LOG_TO_FILE=0
```

3. Run `npm i` to install the dependencies.
4. Run `npm i -g forever`.

## Deploy

- Start: `forever start app.js`.
- Stop: `forever stop app.js`.

## Notices

- If `LOG_TO_FILE` is enable, the access log will log into `access.log` file, simply run `tail access.log` to see it.

## License

[MIT](https://choosealicense.com/licenses/mit/)
