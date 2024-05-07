import express from "express";
import passport from "passport";
import UserController from "../controller/user.controller.js";
const userRouter = express.Router();
const userController = new UserController();

// ------------------------- Get Requests -----------------------

userRouter.get("/signup", (req, res) => {
  userController.renderSignup(req, res);
});
userRouter.get("/signin", (req, res) => {
  userController.renderSignin(req, res);
});
userRouter.get('/signout',(req,res,next)=>{
   userController.signout(req,res,next)
  })
userRouter.get('/download-csv',(req,res,next)=>{
 userController.downloadCsv(req,res,next)
})


// ------------------------- Post Requests -----------------------

userRouter.post("/signup", (req, res) => {
  userController.signup(req, res);
});
userRouter.post("/signin",passport.authenticate('local', { failureRedirect: '/users/signin' }), userController.signin);

export default userRouter;
