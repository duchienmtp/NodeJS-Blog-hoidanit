import connection from "../config/connectDB.js";

let getHomePage = (req, res) => {
  let data = [];
  // simple query
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    console.log(">>> check connection");
    console.log(results); // results contains rows returned by server
    results.map((row) => {
      return data.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        address: row.address,
      });
    });
    console.log("Check data: ", JSON.stringify(data));
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  });
};

export default { getHomePage };
