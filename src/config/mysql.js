import mysql from "mysql";

var mysqlClient = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

mysqlClient.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

export default mysqlClient;
