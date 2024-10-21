import express from "express";
import StudentController from "../controller/student.controller.js";
const stdRouter = express.Router();
const studentController = new StudentController();

// ------------------------- Get Requests -----------------------

// all student List here
stdRouter.get('/',studentController.studenHomePage)
stdRouter.get('/delete/:id',studentController.deleteStudent)

// ------------------------- Post Requests -----------------------

stdRouter.post("/create-student",studentController.createStudent);

export default stdRouter;





