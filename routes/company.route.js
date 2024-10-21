import CompanyController from "../controller/company.controller.js";
import express from 'express';
import passport from 'passport';

const companyRouter = express.Router();
const companyController = new CompanyController();

companyRouter.get("/",companyController.companyPage);
companyRouter.get("/allocate",companyController.allocateInterview);

companyRouter.post("/schedule",companyController.scheduleInterview);
companyRouter.post("/update-status/:id",companyController.updateStatus);




export default companyRouter;