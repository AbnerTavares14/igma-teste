import prisma from "../config/db.js";
import { CreateCustomer, UpdateCustomer } from "../services/customerService.js";



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

    async findById(id: number) {
        return prisma.customer.findUnique({
            where: {
                id
            }
        });
    }

    async updateCustomer(data: UpdateCustomer, id: number) {
        return prisma.customer.update({
            where: {
                id
            },
            data
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