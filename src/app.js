import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import jsPDF from "jspdf";
import { createAdminUser } from "./libs/createUser";
import config from "./config";

// import ptrazadorRoutes from "./routes/pTrazador.routes";
import pprelleRoutes from "./routes/pRelle.routes"
import ptrazadorRoutes from "./routes/pTrazador.routes";
import prellenadorRoutes from "./routes/pRellenador.routes"
import pagosemanal from "./routes/pagosemanal.routes";
import pvaciadorRoutes from "./routes/pVaciador.routes";
import empleadoRoutes from "./routes/empleado.routes";
import indexRoutes from "./routes/index.routes";
import notesRoutes from "./routes/notes.routes";
import userRoutes from "./routes/users.routes";
import "./config/passport";

// Initializations
const app = express();
createAdminUser();

// settings
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",

  })
);
app.set("view engine", ".hbs");

// middlewares
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use (pprelleRoutes)
app.use(ptrazadorRoutes);
app.use(prellenadorRoutes);
app.use(pagosemanal);
app.use(pvaciadorRoutes);
app.use(empleadoRoutes);
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

export default app;
