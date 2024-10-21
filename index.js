import express from "express";
import dotevn from "dotenv";
import passport from "passport";
import session from 'express-session';
import userRouter from "./routes/user.route.js";
import passportConfig from './config/passport-local-startegy.js';
import stdRouter from "./routes/student.route.js";
import companyRouter from "./routes/company.route.js";

dotevn.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
	session({
		//change the secrate before deployment in production mode
		secret: "keshav", // SECRET is stored in the system veriable
		//if the session data is alredy stored we dont need to rewrite it again and again so this is set to false
		resave: false,
		//when the user is not logged in or identity is not establish in that case we dont need to save extra data in
		//session cookie so this is set to false
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 100 },
	})
);

// for authentication
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport); // Initialize passport with configured strategies

// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/',(req,res)=>{
  res.render('home')
})

// Pass user information to views
app.use((req, res, next) => {
	res.locals.user = req.user || null; 
	next();
  });
  
app.use("/users",userRouter)
app.use("/students",stdRouter)
app.use("/company",companyRouter)

export default app;