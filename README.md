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
PORT=3000
SECRET=secret
ADMIN_USER=admin
ADMIN_PASS=admin
DB_HOST=localhost
DB_USER=questions
DB_PASS=questions
DB_NAME=questions
```
3. Run `npm i` to install the dependencies.

## Deploy

- Start: `forever start app.js`.
- Stop: `forever stop app.js`.

## Notices

- The access log will log into `access.log`, to see it, simply run `tail access.log`

## License

[MIT](https://choosealicense.com/licenses/mit/)
