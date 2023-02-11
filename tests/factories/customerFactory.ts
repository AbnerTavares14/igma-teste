import { faker } from "@faker-js/faker";
import gerarCpf from 'gerar-cpf';
import prisma from "../../src/config/db.js";

class CustomerFactory {
    public customerGenerate() {
        const name = faker.name.firstName();
        const cpf = gerarCpf();
        const birthdate = faker.date.birthdate({ min: 1950, max: 2016, mode: 'year' });
        return { name, cpf, birthdate: `${birthdate.getFullYear()}/${birthdate.getMonth()}/${birthdate.getDay()}` };
    }

    public createScenarioTwentyCustomers() {
        return prisma.customer.createMany({
            data: [
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
                { name: "teste", cpf: "11144477735", birthdate: "2000-12-12T02:00:00.000Z" },
            ]
        });
    }
}

export default new CustomerFactory(); 