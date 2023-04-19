const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//my Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//DataBAse Connection
mongoose
  .connect("mongodb://localhost:27017/Twitter20", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected!!!!");
  })
  .catch(() => {
    console.log("Error Connecting to Database");
  });

//Set Routes
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Tanay van is a freelance  developer who makes websites and app."
    />
    <meta name="title" content="Tanay Van" />
    <meta
      name="description"
      content="Tanay van is a freelance  developer who makes websites and app."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://tanayvan.tech/" />
    <meta property="og:title" content="Tanay Van" />
    <meta
      property="og:description"
      content="Tanay van is a freelance  developer who makes websites and app."
    />
    <meta property="og:image" content="" />

    <title>Tanay Van</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <style>
      * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Commissioner", sans-serif;
  scroll-behavior: smooth;
  font-display: auto;
}
.about-us-image {
  width: 50%;
  margin: 15px;
}
.button-link {
  padding: 20px 25px;
  background-color: #191921;
  color: white;
  text-decoration: none;
  margin: 5px;
  font-weight: 700;
}
.button-link:hover,
.button-link-mobile:hover {
  background-color: #434356;
  color: white;
  cursor: pointer;
}
.button-link-mobile {
  padding: 20px 10px;
  background-color: #f94f4f;

  color: white;
  text-decoration: none;
  margin: 5px;
  font-weight: 700;
}
.button-link-footer {
  padding: 20px 25px;
  background-color: #f94f4f;
  color: white;
  text-decoration: none;
  width: fit-content;
  font-weight: 700;
}
.button-link-footer:hover {
  cursor: pointer;
  background-color: #434356;
  color: white;
}
.container {
  margin: 25px;
}
.contact-us {
  text-align: left;
  margin: 70px 0;
}
.contact-container {
  margin-top: 50px;
}
.contact-us-link {
  font-size: 34px;
  text-decoration: none;
  color: #191921;
}
.contact-us-link:hover {
  color: #f94f4f;
}
.footer {
  width: 100%;
  height: 200px;
}
.footer-button-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hamburger {
  display: none;
}
header {
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
  top: 0;
  width: 100%;
  background-color: white;
  position: absolute;
}
.hero {
  width: 100%;
  display: flex;
  margin-top: 100px;
}
.hero-wrap {
  margin: 102px 0;
}
.hero-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.hero-layout p {
  margin: 25px 0;
  font-size: 20px;
}
.heading-1 {
  font-weight: 800;
  font-size: 80px;
  line-height: 80px;
  margin-top: 50px;
}
.heading-2 {
  font-size: 50px;
  font-weight: 800;
  line-height: 60px;
}

.header-nav {
  background-color: #f94f4f;
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.header-nav-wrap {
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  padding-left: 25px;
}

.hero-illustrator {
  margin-left: auto;
  width: 85%;
}
.keypoints-container {
  position: relative;
  z-index: 3;
  bottom: 100px;
}
.keypoints-desc {
  background-color: #f94f4f;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.keypoints-card {
  width: 350px;
  margin: 30px 0;
}
.keypoints-desc h1 {
  position: absolute;
  opacity: 0.25;
  color: white;
  font-size: 80px;
}
.keypoints-desc h3 {
  position: relative;
  top: 50px;
  left: 0px;
  color: white;
  font-size: 15px;
  margin-left: 25px;
  font-weight: 800;
}
.keypoints-desc p {
  margin-top: 75px;
  color: white;
}
.keypoint-heading-2 {
  position: relative;
  text-align: right;
  left: 50px;
  margin-left: 105px;
}
.nav-logo {
  width: 45%;
  margin-left: 100px;
}
.nav-links {
  color: white;
  text-decoration: none;
  margin: 2px;
}
.nav-links:hover {
  font-weight: 700;
  color: white;
}

.mobile-nav {
  display: none;
  transition: all 2s ease-in 5s;
}
.mobile-nav-container {
  display: none;
}
.strategic-design {
  margin-top: 70px;
}
.strategic-design-cover {
  background-image: url(./assets/desktop/daniel-korpai-pKRNxEguRgM-unsplash.webp);
  height: 90vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.strategic-design-content {
  background-color: #191921;
  color: white;
  display: flex;
  justify-content: center;

  flex-direction: column;
}
.strategic-design-content p {
  margin: 50px 0;
}
.strategic-wrap {
  margin-left: 50px;
}
.strategic-link {
  color: #f94f4f;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  padding-bottom: 10px;
  border-bottom: 2px solid #f94f4f;
}
.strategic-link:hover {
  color: white;
  border-bottom: 2px solid white;
}
.strategic-arrow {
  position: relative;
  left: 60px;
}
.project-section {
  margin: 70px 0;
}
.about-me-paragraph {
  font-size: 25px;
  font-weight: 600;
  margin: 25px;
  margin-left: 50px;
}
.skills-point {
  font-size: 20px;
  margin: 10px 0;
  margin-left: 40px;
}
.about-us-wrap {
  display: flex;
  align-items: center;
}
.testimonial-section {
  margin: 70px 0;
}
.project-card {
  margin: 50px 0;
}
.project-image {
  width: 100%;
  border-radius: 25px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
}
.project-card-link {
  text-decoration: none;
}
.project-card-header {
  color: black;
  margin-top: 10px;
  font-size: 22px;
  font-weight: 800;
}
.project-card-link:hover .project-card-header {
  color: #f94f4f;
}
.project-card-link:hover .project-image {
  opacity: 0.9;
}










      </style>
  </head>
  <body>
    <header>
      <div class="nav-logo">
        <div class="heading-2">White Walkers</div>
      </div>

      <div class="header-nav">
        <div class="header-nav-wrap">
          <a href="#testimonials" class="nav-links">Clients</a>
          <a href="#project-section" class="nav-links">Projects</a>
          <a href="#contact-us" class="button-link">Make a Call</a>
        </div>
      </div>
      <div class="hamburger" id="hamburger">
        <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg">
          <g fill="#000" fill-rule="evenodd" opacity=".5">
            <path d="M0 0h24v2H0zM0 8h24v2H0zM0 16h24v2H0z" />
          </g>
        </svg>
      </div>
    </header>



    <div class="hero">
      <div class="container hero-wrap">
        <div class="row">
          <div class="col-lg-6 col-12 hero-layout">
            <div class="heading-1">Lets make a website !</div>
            <p>
              But you must be thinking why you should hire me so check out my
              projects and testimonials.
            </p>
            <a href="#project-section" class="button-link-mobile"
              >See My Projects</a
            >
          </div>
          <div class="col-lg-6 col-12 hero-layout">
            <!-- <img src="./assets/out-2__7_-removebg-preview.png" alt="" width="70%" class="mb-5" /> -->
          </div>
        </div>
      </div>
    </div>


    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="heading-2 text-center">
              Let's build something great together.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </body>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
    crossorigin="anonymous"
    defer
  ></script>

  <script src="script.js"></script>
</html>
`);
});
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 7010;
app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
