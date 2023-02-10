import { Request, Response } from "express";
import Customer from "../model/customer.js";
import { UnprocessableEntityError } from "../exceptions/ErrorHandler.js";


class CustomerController {
    public async getCustomers(req: Request, res: Response): Promise<Response> {
        const customer = new Customer("Abner", "100.444.777-05", new Date(2000, 14, 1));
        return res.send(customer).status(200);
    }

    public async createCustomer(req: Request, res: Response): Promise<Response> {
        const { name, cpf, birthdate } = req.body;

        if (!name || !cpf || !birthdate) {
            throw new UnprocessableEntityError("Name, cpf and birthdate is required!");
        }

        const birthDateFormated = birthdate.split('/');
        const customer = new Customer(name, cpf, new Date(birthDateFormated[0], birthDateFormated[1], birthDateFormated[2]));

        if (!customer.verifyCpf()) {
            throw new UnprocessableEntityError("Invalid cpf");
        }

        return res.sendStatus(200);
    }
}

export default new CustomerController();