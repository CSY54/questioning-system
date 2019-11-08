# Questioning System

A questioning system for our Online Judge developed by [CSY54](https://csy54.github.io/).

<p align="center">
  <a href="https://travis-ci.org/CSY54/Questioning_System">
    <img src="https://travis-ci.org/CSY54/Questioning_System.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://choosealicense.com/licenses/mit/">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="MIT license">
  </a>
  <a href="https://google.github.io/styleguide/jsguide.html">
    <img src="https://img.shields.io/badge/code%20style-Google-brightgreen" alt="Code Style">
  </a>
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
