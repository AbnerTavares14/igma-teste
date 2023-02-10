// import Customer from "../model/customerModel";
import { Customer } from '@prisma/client';
import customerRepository from '../repositories/customerRepository.js';

export interface CreateCustomer {
    name: string;
    cpf: string;
    birthdate: string;
};

async function create(name: string, cpf: string, birthdate: string) {
    const formatBirthdate = birthdate.split("/");
    const customer = await customerRepository.findByName(name);
    if (!customer) {

    }
}

const customerService = {
    create
};