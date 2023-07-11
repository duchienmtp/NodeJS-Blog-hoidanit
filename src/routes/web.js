import express from "express";
import homeController from "../controller/homeController.js";

let router = express.Router();

const initWebRoutes = (app) => {
  router.get('/detail/user/:userID', homeController.getDetailPage)
  router.get('/', homeController.getHomePage);
  router.post('/create-new-user', homeController.createNewUser)
  router.post('/delete-user', homeController.deleteUser)
  router.get('/edit-user/:id', homeController.getEditPage)
  router.post('/update-user', homeController.postUpdateUser)
  router.get('/about', (req, res) => {
    res.send("Hello World form /about");
  });

  return app.use('/', router);
};

export default initWebRoutes;
