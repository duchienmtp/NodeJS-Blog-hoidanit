import express from "express";
import morgan from "morgan";
import configViewEngine from "./config/viewEngine.js";
import "dotenv/config";
import initWebRoutes from "./routes/web.js";
import initAPIRoutes from "./routes/api.js";
// import connection from "./config/connectDB.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("combined"));

// Setup view engine
configViewEngine(app);

// Initialize routes
initWebRoutes(app);

// Initialize routes for API
initAPIRoutes(app);

// Handle 404 not found errors
app.use((req, res) => {
  return res.render("404.ejs");
});

app.use((req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
