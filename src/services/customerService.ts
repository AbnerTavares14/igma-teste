import Customer from "../model/customer.js";
import { ConflictError, NotFoundError, UnprocessableEntityError } from "../exceptions/ErrorHandler.js";
import CustomerRepository from "../repositories/customerRepository.js";
import customerRepository from "../repositories/customerRepository.js";

export interface CreateCustomer {
    name: string;
    cpf: string;
    birthdate: Date;
};

export interface UpdateCustomer {
    name?: string;
    cpf?: string;
    birthdate?: Date;
}

class CustomerService {

    public async create(name: string, cpf: string, birthdate: string) {
        const birthDateFormated = birthdate.split('/');
        let cpfFormatted = this.formatCpf(cpf);
        const existCustomer = await CustomerRepository.findByCpf(cpfFormatted);


        if (existCustomer) {
            throw new ConflictError("O CPF já está cadastrado!");
        }

        const customer = new Customer(name, cpfFormatted, new Date(+birthDateFormated[0], +birthDateFormated[1] - 1, +birthDateFormated[2]));

        if (!customer.cpfIsValid()) {
            throw new UnprocessableEntityError("CPF inválido!");
        }

        await CustomerRepository.create({ name: customer.getName(), cpf: customer.getCpf(), birthdate: customer.getBirthdate() });
    }

    public async findAll(limit: number, skip: number) {
        const customers = await CustomerRepository.findAll(limit, skip);
        return customers;
    }

    public async deleteByCpf(cpf: string) {
        const cpfFormatted = this.formatCpf(cpf);

        const customer = await customerRepository.findByCpf(cpfFormatted);

        if (!customer) {
            throw new NotFoundError("Cliente não está cadastrado!");
        }

        await customerRepository.delete(customer.id);
    }

    public async getCustomerByCpf(cpf: string) {
        const cpfFormatted = this.formatCpf(cpf);
        const customer = await CustomerRepository.findByCpf(cpfFormatted);

        if (!customer) {
            throw new NotFoundError("Cliente não encontrado!");
        }

        return customer;
    }

    public async updateCustomerById(id: number, name?: string, cpf?: string, birthdate?: string) {
        const customer = await CustomerRepository.findById(id);

        if (!customer) {
            throw new NotFoundError("Cliente não encontrado!");
        }

        const cpfFormatted = cpf ? this.formatCpf(cpf) : customer.cpf;
        const cpfAlreadyRegister = cpf ? await CustomerRepository.findByCpf(cpfFormatted) : false;
        const birthDateFormated = birthdate ? birthdate.split('/') : customer.birthdate;
        const dataCustomer = { name: name ? name : customer.name, cpf: cpfFormatted, birthdate: birthDateFormated };
        let customerObj: Customer;

        if (dataCustomer.birthdate[0]) {
            customerObj = new Customer(dataCustomer.name, dataCustomer.cpf, new Date(+dataCustomer.birthdate[0], +dataCustomer.birthdate[1] - 1, +dataCustomer.birthdate[2]));
        } else {
            customerObj = new Customer(dataCustomer.name, dataCustomer.cpf, dataCustomer.birthdate as Date);
        }


        if (cpfAlreadyRegister) {
            throw new ConflictError("CPF já está cadastrado!");
        }

        if (!customerObj.cpfIsValid()) {
            throw new UnprocessableEntityError("CPF inválido!");
        }

        await CustomerRepository.updateCustomer({ name: customerObj.getName(), cpf: customerObj.getCpf(), birthdate: customerObj.getBirthdate() }, id);

    }


    public formatCpf(cpf: string): string {
        const regexCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/;
        let cpfFormatted: string;

        if (regexCpf.test(cpf)) {
            const cpfWithoutVerificationDigits = cpf.split("-");
            const arrCpf = cpfWithoutVerificationDigits[0].split(".");
            let cpfWithoutPoints = arrCpf.join("");
            cpfFormatted = cpfWithoutPoints + cpfWithoutVerificationDigits[1];
            return cpfFormatted;
        } else {
            return cpf;
        }
    }
}

export default new CustomerService;
