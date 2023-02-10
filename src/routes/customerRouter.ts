import { Router } from 'express';
import customerController from '../controllers/customerController.js';


const customerRouter = Router();

customerRouter.get("/", customerController.getCustomers);
customerRouter.post("/", customerController.createCustomer);


export default customerRouter;