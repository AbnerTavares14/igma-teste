import { Request, Response } from "express";
import { UnprocessableEntityError } from "../exceptions/ErrorHandler.js";
import CustomerService from "../services/customerService.js";


class CustomerController {
    public async getCustomers(req: Request, res: Response): Promise<Response> {
        const { limit = '10', page = '0' } = req.query;
        const skip = +page * +limit;
        const customers = await CustomerService.findAll(+limit, +skip);
        return res.send(customers).status(200);
    }

    public async createCustomer(req: Request, res: Response): Promise<Response> {
        const { name, cpf, birthdate } = req.body;

        if (!name || !cpf || !birthdate) {
            throw new UnprocessableEntityError("Name, cpf and birthdate is required!");
        }

        await CustomerService.create(name, cpf, birthdate);

        return res.sendStatus(200);
    }

    public async getCustomer(req: Request, res: Response): Promise<Response> {
        const { cpf } = req.params;

        const customer = await CustomerService.getCustomerByCpf(cpf);

        return res.status(200).send(customer);
    }

    public async deleteCustomer(req: Request, res: Response): Promise<Response> {
        const { cpf } = req.params;
        await CustomerService.deleteByCpf(cpf);
        return res.sendStatus(204);
    }
}

export default new CustomerController();