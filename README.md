# studiECF2023_Fredj_Corentin
This is the repository for the final test of Studi. There is a README.md document, it explain the project.

# Presentation 

This project is a Web application, it has for purpuse to make a subscription page for an early acces to the application BeWave Mobile (It's a startup project since august 2021)

You can create an account and accept to be contacted to be a beta tester.

# External tools

- [Jira](https://projetfun.atlassian.net/jira/software/projects/ECF/boards/2/roadmap?shared=&atlOrigin=eyJpIjoiMjI5NWYzZmVkMDQ5NDQyMTg2YThmNzViZmRiNTIxNTEiLCJwIjoiaiJ9)

- [Github](https://github.com/DroxKiwi/studiECF2023_Fredj_Corentin)



# Packages installed

## nodemon
## express
## cookieparser
## pg (postgresql)
## fs
## uid2
## crypto-js

To connect Express.js to PostgreSQL, you need to use a Node.js package called pg. This package allows you to interact with your PostgreSQL database by sending SQL queries from your Node application.

Install the pg package via npm by running:

npm install pg

In your index.js file, require the pg package at the top of your file:

Create a new instance of the Pool object, passing in an object with configuration options that match your PostgreSQL server's settings:

```js
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: your_database_port,
});
```

To execute a query against your PostgreSQL database using the pool object, use the .query() method. For example, to retrieve all rows from a table named customers, you would write:

```js
app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
});
```

# BackOffice

## fs

## pg

To use postgresql in local on the shell start to change user 

    sudo -i -u postgres

You can now access a Postgres prompt immediately by typing:

    psql

Exit out of the PostgreSQL prompt by typing:

    \q

Once in the PostgreSQL prompt, I create the database database_dev_studiECF

```sql
    CREATE DATABASE database_dev_studiECF
```

## index.js

## Controllers

## Models

## Routes

## Utils

## BDD

# API


## User

## Connection

## Subscription

## Cookies


# FrontOffice

