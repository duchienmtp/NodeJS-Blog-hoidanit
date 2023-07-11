import pool from "../config/connectDB.js";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userID = req.params.userID;
  let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userID]);
  console.log("check req param: ", user);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO `users` (firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userID = req.body.userID;
  await pool.execute(`DELETE FROM users WHERE id = ?`, [userID]);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `UPDATE users
  SET firstName = ?, lastName = ?, email = ?, address = ?
  WHERE id = ?`,
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

export default {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
};
