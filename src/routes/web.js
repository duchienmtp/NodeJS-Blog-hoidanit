import express from "express";
import homeController from "../controller/homeController.js";
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoutes = (app) => {
  router.get("/detail/user/:userID", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);
  router.get("/upload", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.get("/about", (req, res) => {
    res.send("Hello World form /about");
  });
  router.get("/", homeController.getHomePage);

  return app.use("/", router);
};

export default initWebRoutes;
