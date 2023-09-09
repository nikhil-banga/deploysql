const express = require('express');

const sql = require('mssql');

const app = express();

 

// Configuration for SQL Server connection

const dbConfig = {

  user: 'bootcamp',

  password: 'Pass@123',

  server: 'bootcampserver2.database.windows.net',

  database: 'bootcampsep4server2',

  options: {

    encrypt: true, // Use encryption if connecting to Azure SQL

    enableArithAbort:true,

  },

};

app.set('view engine', 'ejs');

// Connect to the SQL Server database

sql.connect(dbConfig)

  .then(() => {

    console.log('Connected to the database');

  })

  .catch((err) => {

    console.error('Error connecting to the database:', err);

  });

 

// Set up a route to retrieve and display data

app.get('/', async (req, res) => {

  // SQL query to select the top 20 rows

  const query1= 'SELECT TOP 20 * FROM SalesLT.Customer';

 


   await sql.query(query1)

    .then((result) => {


      console.log(result.recordset);

      res.render('index', { data: result.recordset });

    })

    .catch((err) => {

      console.error('Error executing SQL query:', err);

      res.status(500).send('Internal Server Error');

    });

});

 

// Set the view engine (EJS in this example)



 

// Start the server

app.listen(3000, () => {

  console.log('Server is running on port 3000');

});