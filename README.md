# Questioning System

Developed by [CSY54](https://csy54.github.io/)

## Setup

1. Create a new table in MySQL from `init.sql` file.
```sh
mysql -u "username" -p < init.sql
```
2. Modify `.env`.
3. Run `npm i` to install the dependencies.
4. Run `npm i -g forever`.

## Deploy

- Start: `forever start app.js`.
- Stop: `forever stop app.js`.

## Notices

- If `LOG_TO_FILE` is enable, the access log will log into `access.log` file, simply run `tail access.log` to see it.

## License

[MIT](https://choosealicense.com/licenses/mit/)
