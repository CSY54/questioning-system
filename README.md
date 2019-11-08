# Questioning System

A questioning system for our Online Judge developed by [CSY54](https://csy54.github.io/).

<p align="center">
[![Build Status](https://travis-ci.org/CSY54/Questioning_System.svg?branch=master)](https://travis-ci.org/CSY54/Questioning_System)
[![MIT license](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Code Style](https://img.shields.io/badge/code%20style-Google-brightgreen)](https://google.github.io/styleguide/jsguide.html)
</p>

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
