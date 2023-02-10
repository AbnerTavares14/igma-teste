import { Router } from 'express';
import customerController from '../controllers/customerController.js';


const customerRouter = Router();

customerRouter.get("/customer", customerController.getCustomers);
customerRouter.get("/customer/:cpf", customerController.getCustomer);
customerRouter.post("/customer", customerController.createCustomer);
customerRouter.delete("/customer/:cpf", customerController.deleteCustomer);


export default customerRouter;