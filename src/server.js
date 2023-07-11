import express from "express"
import configViewEngine from "./config/viewEngine.js"
import 'dotenv/config'
import initWebRoutes from "./routes/web.js" 
// import connection from "./config/connectDB.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
