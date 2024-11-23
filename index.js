const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();
const bibitroutes = require('./src/routes/routerbibit.js'); // Validasi sudah benar
const pupukroutes = require('./src/routes/routerpupuk.js'); // Validasi sudah benar

const mysql = require("mysql");
require("dotenv").config();

// Konfigurasi koneksi MySQL (tidak perlu diekspor di sini)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database: " + error.message);
    return;
  }
  console.log("Berhasil Melakukan Koneksi, brow!");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "secret_key", resave: false, saveUninitialized: true })); // Tambahkan konfigurasi session
app.use(flash());

// Set EJS View Engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Gunakan rute
app.use('/bibit', bibitroutes); 
app.use('/pupuk', pupukroutes); 

app.get('/', (req, res) => res.render('index'));

// Start Server
app.listen(3000, () => {
    console.log("Server Berjalan di Port : " + 3000);
});
