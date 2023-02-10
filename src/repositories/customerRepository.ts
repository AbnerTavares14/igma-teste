import prisma from "../config/db.js";
import { CreateCustomer } from "../services/customerService.js";



class CustomerRepository {
    async create(data: CreateCustomer) {
        return prisma.customer.create({
            data
        });
    }

    async findByCpf(cpf: string) {
        return prisma.customer.findFirst({
            where: {
                cpf
            }
        });
    }

    async findAll(limit: number, skip: number) {
        return prisma.customer.findMany({
            take: limit,
            skip
        });
    }

    async delete(id: number) {
        return prisma.customer.delete({
            where: {
                id
            }
        });
    }
}

export default new CustomerRepository;