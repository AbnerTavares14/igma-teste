import prisma from "../config/db.js";
import { CreateCustomer } from "../services/customerService.js";

async function create(data: CreateCustomer) {
    return prisma.customer.create({
        data
    });
}

async function findByName(name: string) {
    return prisma.customer.findFirst({
        where: {
            name
        }
    });
}

const customerRepository = {
    create,
    findByName
};

export default customerRepository;